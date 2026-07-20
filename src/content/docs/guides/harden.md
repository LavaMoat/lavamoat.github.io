---
title: 'Harden your project with @lavamoat/harden'
description: 'A user guide for @lavamoat/harden'
---

`@lavamoat/harden` is a CLI tool that applies opinionated, good defaults / security hardening to your project's configuration. It writes settings into files like `.npmrc`, `.yarnrc.yml`, `pnpm-workspace.yaml`, and `package.json` to leverage all security-related capabilities of your package manager.

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

`@lavamoat/harden` provides two commands:

- `harden defaults` — apply hardening settings by level.
- `harden wizard` — interactively apply hardening settings by asking questions.

### Apply defaults

```sh
harden defaults
```

This detects the package manager in use and writes hardening config at the **moderate** level (recommended for most projects). Pass `--level` to adjust:

| Level      | What it covers                                                    |
| ---------- | ----------------------------------------------------------------- |
| `baseline` | Absolute minimum that no project should live without              |
| `moderate` | Recommended basic protections that avoid thinking about tradeoffs |
| `paranoid` | Complete cutting-edge security, needs some attention to tradeoffs |

```sh
harden defaults --level paranoid
```

Choose the package manager explicitly with `--package-manager` (`-p`) instead of relying on detection:

```sh
harden defaults -p yarn --level baseline
```

#### Options

```
Options:
  -p, --package-manager <pm>  Package manager to harden (npm, yarn, pnpm)
  -l, --level <level>         Hardening level: baseline, moderate, paranoid  [default: moderate]
  -h, --help                  Show help
  -v, --version               Show version
```

### Wizard

```sh
harden wizard
```

Assesses your project and interactively applies hardening settings. The wizard asks questions about your project and applies the changes you select.

## Opinions

`@lavamoat/harden` comes with opinions about:

- Package manager versions.
- What's allowed to install and run at install time.
- Lesser-known security-relevant settings.
- Cutting-edge tools to prevent certain classes of supply-chain attacks.

### Running scripts

One of the more advanced capabilities `@lavamoat/harden` brings to a project is hardening the environment in which `package.json`'s `scripts` run. It offers the following controls:

- A `lavamoat/.env.ban.json` file to configure censoring of environment variables matching given strings.
- Rearranges `$PATH` to make [bin confusion][bin-scripts-ext] impossible.
- Adds a `package.json` `scriptsConfig` field where files with [Node.js Permissions][node-permissions-ext] options can be selected per-script, with a fallback to `#default`. Example configurations are provided, but it is recommended you customize them to allow the minimal access necessary.

[nodejs-ext]: https://nodejs.org/
[node-permissions-ext]: https://nodejs.org/api/permissions.html
[bin-scripts-ext]: https://socket.dev/blog/npm-bin-script-confusion
[lavamoat-allowscripts]: /guides/allow-scripts
