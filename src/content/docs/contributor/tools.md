---
title: Tools
description: About LavaMoat's tools
---

:::caution[For LavaMoat Developers]

This document is aimed at LavaMoat developers; the information herein may be of limited interest to end-users.

:::

This document contains a list of the developer tools LavaMoat uses.

> _"This is a dynamic list and may never be complete."_

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
- [npm][npm] for package management

[eslint]: https://eslint.org
[typescript]: https://www.typescriptlang.org
[ava]: https://github.com/avajs/ava
[prettier]: https://prettier.io
[husky]: https://typicode.github.io/husky
[lint-staged]: https://github.com/lint-staged/lint-staged
[commitlint]: https://commitlint.js.org
[release please]: https://github.com/googleapis/release-please
[lavamoat-laverna]: https://github.com/lavamoat/lavamoat/tree/main/packages/laverna/#README
[renovate]: https://www.mend.io/renovate/
[socket]: https://socket.dev
[codeql]: https://codeql.github.com
[npm]: https://github.com/npm/cli
