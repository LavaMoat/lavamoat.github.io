---
title: Project Conventions
description: Learn about LavaMoat's conventions
sidebar:
  order: 2
---

:::caution[For Contributors]

This document is aimed at **contributors** to the LavaMoat project and the information herein may be of limited interest to end-users.

:::

In this document, we want to expand on the conventions LavaMoat uses and why the reasoning behind them.

### Code Style

LavaMoat's code style is enforced by ESLint and Prettier. Developers are encouraged to enable auto-formatting of source files in their IDE. LavaMoat strives to squelch debates on code style through automation.

### Compilation

Generally, LavaMoat does not compile sources using tools like Babel or TypeScript. This is not due to the overhead of a build step (though LavaMoat gets that for free!), but rather that LavaMoat's core implementation touches dusty corners of JavaScript which are too easily _lost in transpilation_.

### Types

Generally, LavaMoat does not contain TypeScript sources; it is written in JavaScript and there is no compilation step.

However, LavaMoat uses "[TS-in-JS][js-ts]" via JSDoc-style docstrings. Older code may be untyped, but eventually should become typed. All new code should have proper types. Besides the in-IDE benefits of types, LavaMoat uses these types to generate declaration files (`.d.ts`), which are published.

### Dependency Management

LavaMoat pins its dependencies and uses [Renovate][] to keep them up-to-date. Due to the nature of LavaMoat being a security toolkit, the maintainers exercise caution when adding or upgrading dependencies.

While upgrades are _proposed_ by automation, LavaMoat does _not_ automatically update dependencies. All upgrades must be manually reviewed and approved by a maintainer.

### Releasing

Likewise, LavaMoat automates most of the release process (using [Release Please][]), including Git tags and GitHub Releases. However, a human takes the final step of publishing to the npm registry using [Laverna][lavamoat-laverna].

Packages are versioned independently, and releases are batched together; it's unlikely that a single package will be released in isolation.

LavaMoat follows [Semantic Versioning][semver].

::tip[Further Reading]

Read [How We Work][how-we-work] for in-depth information on LavaMoat's development workflow, process, and tooling.

:::

### Automation

LavaMoat leans on automation for two main reasons:

1. To reduce maintenance burden (e.g., using [Conventional Commits][conventional-commits] to ultimately generate changelogs and publish releases)
2. To reduce the likelihood of human error (e.g. forgetting to publish a package)

[release please]: https://github.com/googleapis/release-please
[lavamoat-laverna]: https://github.com/lavamoat/lavamoat/tree/main/packages/laverna/#README
[renovate]: https://www.mend.io/renovate/
[js-ts]: https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html
[conventional-commits]: https://www.conventionalcommits.org/en/v1.0.0/
[how-we-work]: /contributor/how-we-work
[semver]: https://semver.org/spec/v2.0.0.html
