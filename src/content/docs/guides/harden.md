---
title: 'Harden your project with @lavamoat/harden'
description: 'A user guide for @lavamoat/harden'
---

`@lavamoat/harden` is a CLI tool that applies opinionated, good defaults and security hardening to your project's configuration. It writes security-focused settings into files like `.npmrc`, `.yarnrc.yml`, `pnpm-workspace.yaml`, and `package.json`, while preserving everything else.

:::note[Preview]

Versions `0.x` are preview releases. They will not follow semver and may need more attention when migrating between them.

:::

:::tip[When to use `@lavamoat/harden` vs. `@lavamoat/allow-scripts`]

If you are on modern versions of `npm`, `yarn`, or `pnpm`, `@lavamoat/harden` is now the preferred entry point for securing your project's install-time behavior. It covers lifecycle scripts _and_ several other supply-chain attack vectors. Use [`@lavamoat/allow-scripts`][lavamoat-allowscripts] directly when you're on an older package manager version or want strict allowlisting for yarn.

:::

## Prerequisites

- [Node.js LTS][nodejs-ext]
- One of the following package managers:
  - [npm](https://www.npmjs.com/) (v11.18+)
  - [Yarn](https://yarnpkg.com/) (v4.16+)
  - [pnpm](https://pnpm.io/) (v11+)

## Install

It is not necessary for `@lavamoat/harden` to be a dependency of your project. It's a cli tool that configures it and leaves all improvements in the project configuration files.

Install `@lavamoat/harden` however works best for your workflow:

```sh
npm i -g @lavamoat/harden
npm i -D @lavamoat/harden
npx @lavamoat/harden
```

## Usage

`@lavamoat/harden` provides three commands:

- `harden defaults` — apply hardening settings by level.
- `harden wizard` — interactively apply hardening settings by asking questions.
- `harden check` — check the current config against a hardening level without changing files.

### Apply defaults

```sh
harden defaults
```

This detects the package manager in use and writes hardening config at the **moderate** level (recommended for most projects). Pass `--level` to adjust:

| Level      | What it covers                                                       |
| ---------- | -------------------------------------------------------------------- |
| `baseline` | Disables lifecycle scripts, blocks git deps, sets release age gate   |
| `moderate` | Everything in baseline plus enforces minimum package manager version |
| `strict`   | Maximum hardening, everything the package has to offer               |

```sh
harden defaults --level strict
```

Choose the package manager explicitly with `--package-manager` (`-p`) instead of relying on detection:

```sh
harden defaults -p yarn --level baseline
```

#### Options

```txt
Options:
  -p, --package-manager <pm>  Package manager to harden (npm, yarn, pnpm)
  -l, --level <level>         Hardening level: baseline, moderate, strict  [default: moderate]
  -d, --decisions-snapshot <file>  Path to decisions snapshot file (JSON) to apply regardless of level set
  -s, --save-decisions  Save decisions snapshot to ./decisions-snapshot.json at end of run (useful as a template to edit and re-use)
```

### Wizard

```sh
harden wizard
```

Assesses your project and interactively applies hardening settings. The wizard asks questions about your project and applies the changes you select.

#### Wizard options

```txt
Options:
  -p, --package-manager <pm>  Package manager to harden (npm, yarn, pnpm)
  -d, --decisions-snapshot <file>  Path to decisions snapshot file (JSON) to pre-fill wizard
  -s, --save-decisions  Save decisions snapshot to ./decisions-snapshot.json at end of run
```

### Decisions snapshot

Use `--decisions-snapshot` (`-d`) to load a JSON file with saved decisions, and `--save-decisions` (`-s`) to write the final decisions to `./decisions-snapshot.json`.

- In `wizard`, matching entries pre-fill prompts.
- In `defaults`, matching entries override level-based defaults.

Example:

```json
{
  "n_engines": true,
  "n_scripts": "n_allowscripts",
  "n_git": true,
  "n_strictgit": false,
  "n_filterenv": true
}
```

This makes it practical to share a subset of hardening decisions across a team or to opt out of specific opinions without dropping to a lower hardening level.

```sh
harden wizard -s
harden defaults -d ./decisions-snapshot.json
```

### Check

```sh
harden check
```

Checks your project's current package manager configuration against the requested _hardening level_ without making any changes. Prints a checklist of which opinions at the selected level are already satisfied (`✔`) and which are not (`✖`), along with a summary of scores per package manager config source.

This is useful to enforce in CI to ensure a baseline of hardening is maintained.

Exits with code `0` when everything at the selected level is satisfied, and `1` otherwise.

```sh
harden check --level moderate
harden check -p yarn -l strict
```

#### Check options

```txt
Options:
  -p, --package-manager <pm>  Package manager to check against (npm, yarn, pnpm)
  -l, --level <level>         Hardening level: baseline, moderate, strict  [default: moderate]
```

## Opinions

`@lavamoat/harden` is an _opinionated_ tool. Here's an outline of what exactly it enforces:

<!-- prettier-ignore-start -->
<!-- no toc -->

- [Package manager versions](#package-manager-versions)
- [Which packages are allowed to run an "install" or "post-install" script](#install-scripts)
- [The environment in which `package.json` scripts run](#script-execution-environment)
- [Lesser-known security-relevant settings](#other)
<!-- prettier-ignore-end -->

### Package Manager Versions

`@lavamoat/harden` enforces a minimum version of the package manager in use. The reason for this is nothing to do with vulnerabilities in older versions, but it's about availability of security-related features. For example, `yarn` minimum is, among other things, one of the earliest versions that limit git dependencies; `npm` minimum is one of the earliest versions that support `--ignore-scripts`.

If you use the wizard, you can opt in to set the minimum to the current latest version.

### Install Scripts

Now that all package managers support a way to skip running lifecycle scripts, `@lavamoat/harden` uses that. Yarn is, at the time of writing, not supporting a way to pin approvals to specific versions, which matters because it limits the damage if a trusted package is taken over before you notice.

Depending on your strictness choice, for yarn it can use the built-in `dependenciesMeta` feature to allow scripts for specific packages, or it can use `@lavamoat/allow-scripts` to be more precise about what's allowed. Note that `allow-scripts` requires yarn to create a `node_modules` folder instead of using Plug'n'Play, so that tradeoff is left to you.

> If you choose to approve detected lifecycle scripts in your dependencies, `@lavamoat/harden` will, except for `yarn dependenciesMeta`, generate entries with versions pinned. You should keep them pinned to the version you actually use. None of the package managers support enforcing that the versions remain pinned at the time of writing.  
> Future versions of `@lavamoat/harden` may help with that if a workable enforcement approach is found.

### Script Execution Environment

One of the more advanced capabilities `@lavamoat/harden` brings to a project is hardening the environment in which `package.json` scripts run. It offers the following controls:

- A `lavamoat/.env.ban.json` file to configure censoring of environment variables matching given strings.
- Rearranges `$PATH` to mitigate [bin confusion][bin-scripts-ext].
- Adds a `package.json` `scriptsConfig` field where files with [Node.js Permissions][node-permissions-ext] options can be selected per script, with a fallback to `#default`. Example configurations are provided, but it is recommended you customize them to allow the minimal access necessary.

For more details on how to get the best results from `scriptsConfig`, see the [harden scripts guide](/guides/harden-scripts).

### Other

`@lavamoat/harden` attempts to cover all security-relevant package-manager settings, so things like age gates, git dependency limitations, and package-manager-specific settings like `pnpm`'s `trustPolicy: no-downgrade` are included.

[nodejs-ext]: https://nodejs.org/
[node-permissions-ext]: https://nodejs.org/api/permissions.html
[bin-scripts-ext]: https://socket.dev/blog/npm-bin-script-confusion
[lavamoat-allowscripts]: /guides/allow-scripts
