---
title: "lavamoat node runtime"
description: 'A user guide for running LavaMoat-protected NodeJS applications'
---

`lavamoat` is a Node.js runtime where modules are defined in [SES][ses-github-ext] Compartments. It virtualizes CommonJS module loading to apply runtime protections according to a Policy.

:::caution

This runtime does not support ESM modules. A new runtime that's ESM-first is a work in progress.

:::

## LavaMoat Runtime

LavaMoat differs from the standard node runtime in that it:

1. Uses `lockdown()` from [SES][ses-github-ext] to prevent tampering with the execution environment.
   Thanks to lockdown, prototype-pollution attacks are neutralized. It's also a prerequisite to code isolation.
2. Uses SES Compartments to isolate each package's execution.
   Packages don't share references to anything unless explicitly passed in or allowed by policy. Custom `require` and linking implementation is provided for the purpose of loading allowed dependencies.
3. Enforces the app-specified LavaMoat policy.
   The policy specifies what execution environment each package should run with, which means: what global/built-in APIs should it be exposed to, and what other packages can it require.

The result is a runtime that should work just as before, but provides some protection against supply chain attacks.

## Install

:::tip[Protect your installation]
Before you use lavamoat runtime protections, make sure you've set up allow-scripts and install dependencies using that setup.
:::

Use one of:

```
npm i lavamoat
yarn add lavamoat
```

## Usage

1. Install
2. Run your application once with `lavamoat app.js --autopolicy`
3. Inspect the `./lavamoat/node/policy.json` file it generated
4. Run your application with `lavamoat app.js`
5. If you find you need to change the policy in step 2 or 3 create a `./lavamoat/node/policy-override.json` file and introduce changes there. You can both expand and trim the permissions.

For multiple entry points or apps, use the options to set policy paths to maintain policies specific to each app.

For more information on the lavamoat policy file, check [Policy file explained][policy-file] in documentation.

:::tip[Policy maintenance]

You can regenerate the main policy file on updates (and review for unexpected new permissions) while the modifications you needed to make remain in a separate overrides file. It makes reviewing and maintaining both files easier.

:::

### All options

```
lavamoat <entryPath> [Options]

Positionals:
  entryPath  the path to the entry file for your application. same as node.js
                                                                        [string]

Options:
      --version                             Show version number        [boolean]
      --help                                Show help                  [boolean]
  -p, --policy, --policyPath                Pass in policy. Accepts a filepath
                                            string to the existing policy. When
                                            used in conjunction with
                                            --autopolicy, specifies where to
                                            write the policy. Default:
                                            ./lavamoat/node/policy.json
                                 [string] [default: "lavamoat/node/policy.json"]
  -o, --policyOverride, --override,         Pass in override policy. Accepts a
  --policyOverridePath                      filepath string to the existing
                                            override policy. Default:
                                            ./lavamoat/node/policy-override.json
                        [string] [default: "lavamoat/node/policy-override.json"]
      --policyDebug, --pd, --policydebug,   Pass in debug policy. Accepts a
      --policyDebugPath                     filepath string to the existing
                                            debug policy. Default:
                                            ./lavamoat/node/policy-debug.json
                           [string] [default: "lavamoat/node/policy-debug.json"]
  -a, --writeAutoPolicy, --autopolicy       Generate a "policy.json" and
                                            "policy-override.json" in the
                                            current working         directory.
                                            Overwrites any existing policy
                                            files. The override policy is for
                                            making manual policy changes and
                                            always takes precedence over the
                                            automatically generated policy.
                                                      [boolean] [default: false]
      --writeAutoPolicyAndRun, --ar,        parse + generate a LavaMoat policy
      --autorun                             file then execute with the new
                                            policy.   [boolean] [default: false]
      --writeAutoPolicyDebug, --dp,         when writeAutoPolicy is enabled,
      --debugpolicy                         write policy debug info to specified
                                            or default path
                                                      [boolean] [default: false]
      --projectRoot                         specify the director from where
                                            packages should be resolved
            [string] [default: "/home/naugtur/work/metamask/metamask-extension"]
  -d, --debugMode, --debug                  Disable some protections and extra
                                            logging for easier debugging.
                                                      [boolean] [default: false]
      --statsMode, --stats                  enable writing and logging of stats
                                                      [boolean] [default: false]

```

## Examples

### Run with Policy in default location

This uses the existing policy and policy-override files to run your app.

```bash
lavamoat index.js
```

Automatically searches for policy files inside `./lavamoat/node/`.

### Policy Override with Relative Path

This uses the override policy specified at `./policies/policy-override.json`.

```
$ lavamoat index.js --override './policies/policy-override.json'
```

## Troubleshooting

- Having trouble reading thrown Errors? try running with the `--debugMode` flag. **Warning:** not safe for production runs.

- Got a dependency that wont quite work under LavaMoat? try [patch-package](https://www.npmjs.com/package/patch-package)

For more details go to the [troubleshooting section][troubleshooting]

## Programmatic usage

Programmatic usage is almost identical to the commandline and its arguments.

```js
const { runLava } = require('lavamoat')

runLava({
  entryPath: './app.js',
  // Optional:
  writeAutoPolicy: false,
  writeAutoPolicyDebug: false,
  writeAutoPolicyAndRun: false,
  policyPath: 'path to file',
  policyDebugPath: 'path to file',
  policyOverridePath: 'path to file',
  projectRoot: process.cwd(),
  debugMode: false,
  statsMode: false,
})
```

[ses-github-ext]: https://github.com/endojs/endo/tree/master/packages/ses
[policy-file]: ./policy
[troubleshooting]: ./troubleshooting
