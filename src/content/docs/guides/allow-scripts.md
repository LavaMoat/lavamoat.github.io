---
title: "Protect dependency installation process with allow-scripts"
description: 'A user guide for @lavamoat/allow-scripts'
---

`@lavamoat/allow-scripts` is a CLI tool for instructing your package manager to execute _only_ the dependency lifecycle hooks specified in an _allowlist_.

## Prerequisites

- [Node.js LTS][nodejs-ext]
- One of the following package managers:
  - [npm](https://www.npmjs.com/) v8.0.0+
  - [Yarn](https://yarnpkg.com/) v1.22.0+
  - [Yarn Berry](https://yarnpkg.com/) v3 or above

## Install

- **npm**: `npm i -D @lavamoat/allow-scripts`
- **Yarn**: `yarn add -D @lavamoat/allow-scripts`

Note that installation of the dependency is likely to cause your other dependencies to be installed. You could install `@lavamoat/allow-scripts` globally and use it to set up a project without triggering installing dependencies before the setup and the allowlist is in place.

## Setup

### Initialization

The `setup` command will initialize your project for use with `@lavamoat/allow-scripts`.

- **npm**: `npm exec allow-scripts setup`
- **Yarn**: `yarn allow-scripts setup`

:::tip[What does "setup" do?]

Depending on the detected package manager, the `setup` command will add `ignore-scripts=true` to your package's `.npmrc`, or `enableScripts: false` to your package's `.yarnrc.yml`. If the file does not exist, it will be created. (yarn1 is also still supported)

As a failsafe, the setup command then adds a _dev_ dependency on [`@lavamoat/preinstall-always-fail`][preinstall-fail-ext] to `package.json`. `@lavamoat/preinstall-always-fail` will throw an error if an install-time lifecycle script is run--which _should_ never occur (due to the `ignore-scripts` configuration).

:::

### Configuration

Configuration can be done automatically or manually.

:::caution[Principle of Least Privilege]

While you _can_ choose to allow everything you've been running, strive to limit the list--a tool with an _existing_ lifecycle script can exploited. To determine which packages' scripts can be safely ignored, consider [can-i-ignore-scripts][can-i-ignore-scripts-ext] before you manually research each one of them.
:::

#### Automatic Allow-listing

The `auto` command will generate and write a configuration to the `lavamoat` property of `package.json`.

- **npm**: `npm exec allow-scripts auto`
- **Yarn**: `yarn allow-scripts auto`

#### Manual Allow-listing

`@lavamoat/allow-scripts`'s configuration is stored in the `lavamoat` property of `package.json` within its `allowScripts` property.

The value is of type `Record<PackageName, boolean>` where `PackageName` is a dependency which is either allowed or disallowed to run lifecycle scripts. To allow script execution, use a value of `true`; to disallow, use a value of `false`.  
Items missing from the list will cause a warnings so that you know when you might need to add a newly installed item to the list.

#### Example Configuration

```json title=package.json
{
  "lavamoat": {
    "allowScripts": {
      "keccak": true,
      "core-js": false
    }
  }
}
```

## Running Lifecycle Scripts

When invoked without a command (or with the `run` command), `allow-scripts` will execute **all** lifecycle scripts for the packages specified in `@lavamoat/allow-scripts`'s configuration:

- **npm**: `npm exec allow-scripts run`
- **Yarn**: `yarn allow-scripts run`

`allow-scripts` will fail if it detects dependencies attemping to run scripts which haven't yet been configured; you will be advised to run [`allow-scripts auto`][automatic-configuration] to rectify the situation.

### Yarn plugin

To comfortably work with Yarn Berry (specifically yarn v3 or above) it's recommended that you use a simple plugin to execute `allow-scripts` after installation. 

Yarn plugins are installed via public URLs.

```
yarn plugin import https://raw.githubusercontent.com/LavaMoat/LavaMoat/main/packages/yarn-plugin-allow-scripts/bundles/@yarnpkg/plugin-allow-scripts.js
```

:::tip[Raw git URL disclaimer] 
Fetching scripts from git is not something we like to endorse. Before you run a script you download, check its content. Feel free to remove the entry with the URL from the `.yarnrc.yml` to prevent it from updating and only keep the entry specifying the plugin if you have the `.yarn` folder checked-in to source control. 

:::

## Show Configured Packages

Use the `list` command to print information about configured packages and scripts, specifying _allowed_ and _disallowed_ packages.

- **npm**: `npm exec allow-scripts list`
- **Yarn**: `yarn allow-scripts list`

## Usage Tips

Consider adding a `setup` lifecycle script for all your post-install steps. This can be just a regular script (_no magic needed!_). Also, it is a good place to add other post-processing commands you want to use.

In the future, when you add additional post-processing scripts, e.g. [`husky`][husky-ext], you can add them to this `setup` script.

```json title="Example setup script"
{
  "scripts": {
    "setup": "npm install && npm exec allow-scripts && tsc -b"
  }
}
```

## Mitigating bin script confusion

:::caution

This is an experimental feature.

:::

_Bin script confusion_ is a shell injection attack ([wiki][shell-injection-ext]) where a dependency causes a malicious script to run by declaring a `bin` script (in `package.json`) matching an executable in the user's `PATH`. `ignore-scripts` **does not** protect against this attack.

:::tip[Further Reading]

More details in can be found in on [Socket][]'s blog: [npm bin script confusion: Abusing 'bin' to hijack 'node' command][bin-scripts-ext].

:::

To enable protection against bin script confusion, use the `--experimental-bins` flag when executing `allow-scripts`.

### What does `--experimental-bins` do?

- `allow-scripts setup` will add a new configuration option to your project's package manager RC file (`.npmrc`/`.yarnrc`) to disable automatic linking `bin` scripts
- `allow-scripts auto` will generate an allowlist of `bin` scripts allowed for execution
- `allow-scripts run` will link _only_ the allowed scripts and replace disallowed scripts with a trivial executable that exits with a non-zero exit code.

When a disallowed `bin` script is attempted to be executed, the command will fail with an error providing guidance.

[nodejs-ext]: https://nodejs.org/
[husky-ext]: https://typicode.github.io/husky/
[automatic-configuration]: #automatic-configuration
[can-i-ignore-scripts-ext]: https://npm.im/can-i-ignore-scripts
[bin-scripts-ext]: https://socket.dev/blog/npm-bin-script-confusion
[shell-injection-ext]: https://en.wikipedia.org/wiki/Code_injection#Shell_injection
[socket]: https://socket.dev
[preinstall-fail-ext]: https://github.com/LavaMoat/LavaMoat/tree/main/packages/preinstall-always-fail
