---
title: Developer's Handbook
description: Learn about LavaMoat's project structure and internals.
---

This document is aimed at developers of (and contributors to) LavaMoat. It contains information about LavaMoat's [project structure][], [internals][], [tools][] and [conventions][].

## Project Structure

LavaMoat is organized as a monorepo, and contains the following published packages:

| Package                            | Description                                                                                         |
| ---------------------------------- | --------------------------------------------------------------------------------------------------- |
| `@lavamoat/aa`                     | Provides functions to generate canonical package names which are consistent across package managers |
| `@lavamoat/allow-scripts`          | An allow-list for on-install lifecycle scripts                                                      |
| `lavamoat-browserify`              | Browserify plugin for LavaMoat                                                                      |
| `lavamoat-core`                    | Core functionality; kernel and policy enforcement                                                   |
| `@lavamoat/lavapack`               | A bundle packer for Browserify based on [`browser-pack`][browser-pack-ext]                          |
| `@lavamoat/laverna`                | Tool to publish multiple workspaces in a monorepo                                                   |
| `lavamoat-node`                    | Node.js adapter for LavaMoat                                                                        |
| `@lavamoat/preinstall-always-fail` | A package that fails if its `preinstall` lifecycle script is run                                    |
| `lavamoat-tofu`                    | A tool to generate a LavaMoat policy from a dependency graph                                        |
| `@lavamoat/webpack`                | Webpack plugin for LavaMoat                                                                         |

All directories are relative to `packages/`.

## Internals

> TODO: This section should probably just link to other documents as necessary. I don't think any such documents exist, though.

## Conventions

> TODO: I'd probably talk about how we try to create and ship types, automate away discussions about code style, etc. Anything PR-related should probably live in the contributor's guide.

## Tools

> This is a dynamic list and may never be complete.

LavaMoat uses the following developer tools:

- [ESLint][] and sundry plugins
- [TypeScript][] for type-checking and declaration generation; not used for compilation
- [AVA][] for testing
- [Prettier][] and plugins for code formatting
- [Husky][] and [lint-staged][] for pre-commit and commit message hooks
- GitHub Actions for continuous integration
- [Renovate][] for dependency management
- [CodeQL][] for static analysis
- [Socket][] for supply-chain security
- [commitlint][] for commit message conventions
- [Release Please][] and [Laverna][lavamoat-laverna] for versioning and publishing

[browser-pack-ext]: https://github.com/browserify/browser-pack
[project structure]: #project-structure
[internals]: #internals
[tools]: #tools
[conventions]: #conventions
[eslint]: https://eslint.org
[typescript]: https://www.typescriptlang.org
[ava]: https://github.com/avajs/ava
[prettier]: https://prettier.io
[husky]: https://typicode.github.io/husky
[lint-staged]: https://github.com/lint-staged/lint-staged
[commitlint]: https://commitlint.js.org
[release please]: https://github.com/googleapis/release-please
[lavamoat-laverna]: https://github.com/lavamoat/lavamoat/tree/main/packages/laverna
[renovate]: https://www.mend.io/renovate/
[socket]: https://socket.dev
[codeql]: https://codeql.github.com
