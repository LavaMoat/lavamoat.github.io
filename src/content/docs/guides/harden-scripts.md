---
title: 'Harden the Script Execution Environment'
description: 'How to choose scriptsConfig entries and Node.js permission profiles for @lavamoat/harden'
---

This guide covers the Script Execution Environment hardening feature of [`@lavamoat/harden`](/guides/harden).

`@lavamoat/harden` can assign Node.js permission profiles to your `package.json` scripts so commands like `build`, `lint`, `test`, or `release` do not all run with the same level of access. This lets you keep routine local scripts constrained while still making room for the few commands that genuinely need broader capabilities.

This page focuses on how to use `scriptsConfig` to achieve the best [principle of least privilege][least-privilege] for your scripts with minimal impact on your workflow.

If you want the broader overview of the tool first, start with the [main harden guide](/guides/harden).

## Quick start

When script hardening is enabled, `@lavamoat/harden` creates two example profiles:

- `lavamoat/scripts.strict.json`
- `lavamoat/scripts.loose.json`

It also writes a `scriptsConfig` object in `package.json`. The generated default is:

```json title="package.json"
{
  "scriptsConfig": {
    "#default": "lavamoat/scripts.loose.json"
  }
}
```

That is a compatibility-first default. For better security, review it and move as many scripts as possible to stricter configurations.

## What goes in `scriptsConfig`

`scriptsConfig` is a map from script names (of the `scripts` field in package.json) to JSON files that contain `NODE_OPTIONS` values with the permission profile for that script.

The permissions are set using the Node.js permission model, which is documented in the [Node.js Permissions API][permissions] with extensions provided by `@lavamoat/harden` [documented below](#extensions-to-nodejs-permissions).

There are two approaches you can take:

### 1. Security-first

- Use `#default` for the profile most scripts should get.
- Add explicit entries only for exceptions.
- Point each entry at a checked-in JSON file under `lavamoat/`.
- Keep one file per profile, not one file per script, unless the script is unusually sensitive.

Example:

```json title="package.json"
{
  "scripts": {
    "lint": "eslint .",
    "test": "ava",
    "build": "vite build",
    "release": "node scripts/release.mjs"
  },
  "scriptsConfig": {
    "#default": "lavamoat/scripts.strict.json",
    "build": "lavamoat/scripts.loose.json",
    "release": "lavamoat/scripts.release.json"
  }
}
```

This means:

- `lint` gets the strict profile.
- `test` gets the strict profile.
- `build` gets the loose profile.
- `release` gets a dedicated custom profile.

It is unlikely—but possible—that some of your scripts will be very difficult to cover with an impactful permissions profile without breaking them. If you're introducing this tool to an existing project with many complex scripts, you may initially prefer the compatibility-first approach.

### 2. Compatibility-first

- Don't set a default profile.
- Add explicit entries for most commonly used scripts that you can afford to harden.
- Build up a set of profiles over time as you learn what each script needs.

Omitting a default is particularly useful when you often compose scripts from other scripts.

```json
"scripts": {
  "ci": "npm run lint && npm run test && npm run build",
  "lint": "eslint .",
  "test": "ava",
  "build": "vite build",
},
"scriptsConfig": {
  "lint": "lavamoat/scripts.strict.json",
  "test": "lavamoat/scripts.strict.json",
  "build": "lavamoat/scripts.loose.json"
}
```

In that case, the permissions are applied to the Node.js process that runs your package manager for the nested scripts as well, leading to you having to allow all necessary permissions for it even though they may not be needed. It's sometimes better to not cover the composition at all, because you will get to set the permissions for every script it calls.

Alternatively, you can use a [null profile](#null-profile) to explicitly allow the composing script to run without any permission restrictions.

Be careful about situations where it's mixed:

```json
"scripts": {
  "ci": "npm run lint && npm run test && vite build",
}
```

It's recommended that you organize your scripts so that the `scriptsConfig` entries have enough granularity to set the minimal permissions.

### Starter Profiles

`@lavamoat/harden` ships two starter profiles. They are examples, not ideal end states.

### `lavamoat/scripts.strict.json`

Use this for scripts that only need to work inside the project directory.

The "strict" profile:

- Enables the Node.js permission model.
- Allows reading `./`.
- Allows writing `./`.
- Denies network access.
- Denies all powerful capabilities that could undermine the permissions model limitations if used maliciously.

Good candidates:

- linters
- formatters
- simple type-checking
- scripts that read and write project files only

### `lavamoat/scripts.loose.json`

Use this for scripts that are still local-only in spirit, but depend on toolchains that need more native capabilities.

The "loose" profile:

- enables the Node.js permission model
- allows broad file reads
- allows writing to the project directory
- allows temp-directory writes
- denies network
- allows native modules and child processes for compatibility (sometimes they can't be avoided)

Good candidates:

- build pipelines that shell out to other tools
- scripts that rely on native addons
- scripts that need temporary files
- transitional setups while you learn what a tool actually needs

The loose profile is useful, but it is intentionally much broader than the strict one. Treat it as a starting point to narrow down.

**It is recommended to create multiple tailored profiles, especially for the more sensitive scripts or the ones that pull in many dependencies.**

## Example Custom Profiles

In practice, most projects benefit from adding a few custom profiles instead of relying only on `strict` and `loose`.

### Null profile

If you need to explicitly allow a script to run without any permission restrictions, you can create a null profile:

```json title="lavamoat/scripts.null.json"
{
  "NODE_OPTIONS": {}
}
```

### Lint and formatting

Start from `scripts.strict.json`.

Usually keep:

- `--permission`: `true`
- `--allow-fs-read`: `./`
- `--allow-fs-write`: `./`

Do your best to deny:

- `--allow-net`
- `--allow-child-process`
- `--allow-worker`
- `--allow-addons`
- `--allow-wasi`
- `--allow-inspector`

If your formatter or linter only reads files and writes nothing, you can try dropping write access too. If it autofixes, keep write access to `./`.

### Type-checking and local tests

Start from `scripts.strict.json`.

Usually keep:

- project read access
- project write access if the tool writes caches or reports

Consider enabling only if needed:

- `--allow-fs-tmp` or temp-directory write access
- `--allow-worker`

Keep network disabled unless the test intentionally talks to external services.

### Build scripts and bundlers

Start from `scripts.loose.json`, then remove what is unnecessary.

Build tools commonly need one or more of:

- child processes
- workers
- native addons
- temp-directory writes

They do not usually need:

- outbound network access during a normal local build
- inspector access

If your build is pure JavaScript and stays within the project tree, try moving it closer to the strict profile.

### Release and publish scripts

Do not reuse your general-purpose default for release automation.

Create a dedicated profile for scripts that:

- publish to registries
- create releases
- upload artifacts
- contact remote APIs

These scripts may need `--allow-net`, but they should usually remain special-case entries in `scriptsConfig`, never the `#default` profile.
Having allowed network access, you might want to limit the file-system access to avoid accidental exposure of your `.ssh` or browser profiles in your development environment.

## Choosing permissions

### File system permissions

Be deliberate with file access. This is usually where the biggest security gain comes from.

Good defaults:

- Prefer `./` for project-local reads.
- Prefer `./` for project-local writes.
- Add temp-directory write access generously, as it is usually safe and needed by many tools.
- Avoid broad read access such as `/` unless compatibility forces it. Remember you can use `$npm_*` environment variables to allow access to specific directories that your package manager chooses dynamically across different OSes and configurations in your team and CI. For example, `$npm_config_cache` is the npm cache directory, and `$npm_config_prefix` is the global install directory. See more in the npm documentation: [npm config](https://docs.npmjs.com/cli/v11/using-npm/scripts#environment).

The example `scripts.loose.json` allows broad reads because some real-world toolchains expect access outside the project directory. This maximizes compatibility, but is not ideal. Narrow it when you can.

### Network permissions

::: warning

`--allow-net` is the most recently added permission in Node.js and versions prior to 26 will silently ignore it.

:::

### Native capabilities and process spawning

These are the most powerful capabilities and could be used to bypass your disk and network access limitations, but are commonly used in developer toolchains. The best you can do is narrow them down as much as possible.

Other LavaMoat tools can help you reduce the risk of attacks through these capabilities; see [LavaMoat Node.js runtime guide](/guides/lavamoat-node) for more details.

## Extensions to Node.js permissions

`@lavamoat/harden` adds a few extensions to the Node.js permission model:

- `--allow-fs-tmp` allows writing to the OS temporary directory. This is a common need for many tools, and usually safe to allow, but very uncomfortable to maintain in a file shared among team members with different operating systems.
- Resolving environment variables in `--allow-fs-*` permissions:
   The `@lavamoat/harden` script runtime will resolve environment variables in the `--allow-fs-*` permissions, so you can use `$npm_*` environment variables that package managers set based on their configuration but also any environment variables that you set in your CI or local.


## How it works

`@lavamoat/harden` applies the permission profiles by setting the `NODE_OPTIONS` environment variable for each script to include the permission flags from the profile file. That way, every Node.js process running under this environment will be covered with the policy _even though_ your script might be a line of bash with a few indirections or a shell script.

The environment modifications are applied by the package manager when it runs the script, so you don't have to do anything special in your scripts themselves.

For `npm` and `pnpm`, we make the modifications by intercepting the shell in which scripts are spawned. For `yarn` we use a plugin that modifies environment in the `wrapScriptExecution` hook.

## Limitations

- The mechanism relies on specific package manager features and `node --run` is not currently supported. If you use `node --run` to run scripts, the permission flags will not be applied.
- Threat models for Node.js, its Permissions Model and LavaMoat all differ and may also differ from your project's threat model. **You** are still responsible for avoiding malicious dependencies as these protections **will not stand up to a targeted attack that chooses to use existing permissions.**
- Limiting permissions does not prevent a package you legitimately use from being compromised and used to attack you by modifying its functionality (e.g., the  TypeScript compiler being modified to insert malware into the application it builds).
- Environment variables are inherited by child processes by default, but `exec` and `spawn` calls can be made with an override; a malicious script with permission to spawn can choose to spawn a child process _without_ the `NODE_OPTIONS` environment variable. See [Node.js Permissions Model Constraints][permissions-constraints] for more details on possible bypasses and threat model.

[permissions-constraints]: https://nodejs.org/api/permissions.html#permission-model-constraints
[permissions]: https://nodejs.org/api/permissions.html
[least-privilege]: https://en.wikipedia.org/wiki/Principle_of_least_privilege
