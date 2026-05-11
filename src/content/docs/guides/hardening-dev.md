---
title: 'Harden your local development environment'
description: 'A guide on how to settings that minimise the risk of local dev compromise.'
---

> Updated: 2026-05

This document lists the low-hanging-fruit settings you can put in place to make your local development environment more resistant to compromise when working with the Web ecosystem.
This is not _defense-in-depth_, but rather provides the most _bang-for-your-buck_ against supply chain attacks and other common attack vectors in the ecosystem.

## Malware avoidance defaults

This section explains how to configure your project to prevent dangerous package manager behavior.

:::tip[Don't ignore npm]
If you use Node.js, then `npm` is installed. If you're not using it, it's all the more reason to put in strict defaults in `~/.npmrc` and local `.npmrc` files in projects.
:::

### npm

For npm you should put a default `.npmrc` in your home folder; this configuration will be consulted whenever the project doesn't have one. Create this, and create one for every project.

```ini title=.npmrc
## Ignore all lifecycle scripts by default. You can
## still allow them on a per-package basis with
## @lavamoat/allow-scripts
ignore-scripts=true
# Avoid installing packages published in last 2 days
min-release-age=3
## Don't install packages from git urls, which can
## be used to bypass the above two settings
allow-git=none
## allow direct git dependencies only
# allow-git=root

## Enable this if you never want to use git dependencies
## Break git usage for older npm versions that don't
## support allow-git and repositories that override it
# git=false

## Don't install packages without asking (only
## applicable to old npx versions)
install=false

## enable this if you don't really use npm and want to
## avoid consequences of some script calling npm or npx
## Don't install packages unless they're in local cache
# offline=true
## Don't put commands from packages in PATH
# bin-links=false
```

:::note[How the two git options interact]
If you're ready to commit to never installing git dependencies, setting `git=false` in your home config `~/.npmrc` will stop npm from using git at all.

Fun fact: `false` here is _not_ a boolean; it's an executable to use as the `git` command. `false` is a command available in POSIX shells that always fails. Thus, any attempt to use `git` by `npm` will fail with an error.

```sh
npm ERR! code 1
npm ERR! command failed
npm ERR! command false ls-remote ssh://git@github.com/something/something.git
```

If you want to set `allow-git=root` in some of the projects, you can't put `git=false` in your home config, but you _can_ still set `allow-git=none` and `git=false` in project-specific `.npmrc` files and put `allow-git=root` and no value for a git command override in the projects where you want to allow direct git dependencies.

:::

### Yarn

Upgrade to Yarn 4.14+ which adds the `approvedGitRepositories` setting.

Once you add the setting, earlier versions of Yarn 4.x will complain about an unknown field, so it'll be hard to miss you're not on the right version.

```yaml title=.yarnrc.yml
## Don't run lifecycle scripts by default. You can still
## allow them on a per-package basis with @lavamoat/allow-scripts
enableScripts: false
## Allowlist of git dependencies. Empty to block all git deps.
approvedGitRepositories: []
## Avoid installing packages published in last 3 days
npmMinimalAgeGate: 4320 # 3 days (in minutes)
## Override the minimal age gate, allowing certain packages
## to be installed regardless of their publish age.
#npmPreapprovedPackages:
#  - '@yournamespace/*'

## This one is a bit paranoid
## disable global cache to avoid cross-project poisoning
enableGlobalCache: false
```

In case a contributor attempts to use the wrong Yarn version, you need to avoid Yarn v1.x running the lifecycle scripts.

```ini title=.yarnrc
ignore-scripts true
```

:::note[approvedGitRepositories]
Yarn 4.14+ will avoid installing git dependencies in new projects by default. For your existing projects, declaring empty `approvedGitRepositories` is necessary. Do it everywhere as a convention to avoid surprises.
:::

:::tip[allow-scripts Yarn integration]
Use a Yarn plugin to always run `@lavamoat/allow-scripts`. This avoids the need to run `yarn allow-scripts run` every time you `yarn install`. Conveniently, we have such a plugin: [yarn-plugin-allow-scripts](https://github.com/LavaMoat/LavaMoat/tree/main/packages/yarn-plugin-allow-scripts)
:::

### pnpm

You're pretty much set, if you're on pnpm 11+.

You can still use `@lavamoat/allow-scripts` for the allow-list with version management, but `pnpm` is equally good.

```yaml title=pnpm-workspace.yaml
## Avoid installing packages published in last 3 days
minimumReleaseAge: 4320 # 3 days (in minutes)
## Override the minimal age gate, allowing certain packages
## to be installed regardless of their publish age.
# minimumReleaseAgeExclude:
# - '@yournamespace/*'

## Selectively run lifecycle scripts
# allowBuilds:
#   package@VERSION: true
#   package@VERSION || ANOTHERVERSION: true

## This might prevent some cases of package takeover, but
## will also react to maintainers publishing versions inconsistently
## Fail if trusted publishing or provenance is gone from a
## package that used to have it
trustPolicy: no-downgrade
## Only if you're still on pnpm v10
# blockExoticSubdeps: true # block git and file dependencies of dependencies
```

:::note[allowBuilds vs @lavamoat/allow-scripts]

- `allowBuilds` does not force you to pin versions of allowed packages (it's better for your security posture if you just can't do the risky thing)
- the ux of `pnpm approve-builds` and `allow-scripts auto` differs
- `allow-scripts` needs to be run manually to execute the allowed lifecycle script, while `pnpm` will run allowed scripts as part of the install process
- `allowBuilds` uses package names as identifiers, so you must pin specific versions and avoid installing packages from bogus sources that could spoof their names.

:::

### Securely Running Lifecycle Scripts

If you need to allow lifecycle scripts for some packages, use `@lavamoat/allow-scripts` to set up a per-package allowlist.
It identifies packages with their position in the dependency tree, so if you allow one package, scripts from different packages that match the name will not run. (git and bundled dependencies declare their own name in `pacage.json` to be whatever they want)

For more information, see the [complete `@lavamoat/allow-scripts` guide](./allow-scripts.md).

### If You Absolutely Must Use Git Dependencies

If you must use git dependencies, there's a tool to help you validate they're being used as safely as possible: [@lavamoat/git-safe-dependencies](https://www.npmjs.com/package/@lavamoat/git-safe-dependencies).

`@lavamoawt/git-safe-dependencies` is a CLI tool which validates Git dependencies against a set of opinionated rules.

:::tip[Github Actions]
BTW, you can also use it for your Github Actions workflows - they install all of their dependencies from git.
:::

## Fundamental secrets hygiene

1. Use a password manager
2. Enable 2fa on your `npmjs.com` account (even if you don't publish from localhost)
3. Protect your ssh keys
   A: Configure an ssh agent with a password protected key

   - An ssh agent will help avoid needing to enter the password every time you use the key.
   - Make your existing ssh key hard to crack with the `-a` option. Set iterations to 1024 instead of 16 (it will take a few seconds to unlock, but you can survive that once a day)

   ```sh
   ssh-keygen -p -a 1024 -t ed25519 -f ~/.ssh/id_ed25519
   ```

   B: If you're a 1Password user, use the ssh-agent from 1Password and keep your keys there. Works best if you need to tap the fingerprint reader every time your key is used.

   - [1Password ssh-agent](https://developer.1password.com/docs/ssh/agent/)
   - (please suggest other password managers that have a good locked-by-default ssh agent)

4. Don't give secrets to AI agents. Don't run highly-privileged agents (e.g., Openclaw) on the same machine as your development environment.
5. Avoid storing plaintext secrets, even for unimportant testing environments, in `.env` files or similar. If you have to put them there while you're testing, make sure to _delete them ASAP_ and only store them permanently in a password manager.

## Get early warnings

You can install Socket Firewall to prevent known malware from being installed on your machine. In some cases it can detect malware that's still active on the npm registry.

- [Socket Firewall Free](https://docs.socket.dev/docs/socket-firewall-free)

## Proactive compartmentalization

We've eliminated the most popular install-time compromise vectors by this point, but that's not the only time you run someone else's code in your dev environment. What about when you run `npm run build` or `yarn lint`?
It'd be great to have a virtual dev environment for every project or find a way to consistently use tools like:

- `docker sandbox` on any OS
- `firejail` or `bubblewrap` on Linux
- `windows-sandbox` on Windows

...but _without_ giving up on the developer experience (if you already do, feel free to skip this part).

Remember, we're focusing on low-effort high-reward solutions here.

### Kipuka

Kipuka is an experimental tool, that - once installed - transparently wraps every use of your package manager in a Docker container.

You can use it to:

- Avoid exposing your entire OS and filesystem to the code that runs when you `npm run lint` or `yarn build`, etc. It aliases your package manager and runs the container transparently, so you don't have to change the workflow you're used to.
- Quickly spin up a container to run commands in the current folder in isolation.
- Customize your container without learning all the details of how a `Dockerfile` works

See the [Kipuka README](https://github.com/lavamoat/kipuka) for installation instructions and usage details.

:::caution[Experimental]

Kipuka is an experimental tool, so expect some rough edges. If you fix them with customizations, please consider contributing them back to the project.

:::
