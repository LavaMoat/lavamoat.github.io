---
title: FAQ
description: Frequently Asked Questions
---

## What is LavaMoat?

**LavaMoat** is a suite of tools for securing JavaScript projects against a category of attacks called [**supply chain attacks**][supply-chain-attack].

In short, this genre of attack occurs when a malicious dependency makes its way into software. An attacker could use the dependency to then steal important secrets (like credit card numbers, private keys, or data) or make the application vulnerable to a range of other attacks. Such attacks are ubiquitous in modern software development, and JavaScript is no exception.

LavaMoat can mitigate the risk of supply chain attacks in:

- The development environment (e.g., `npm install <evil-package>`)
- The build pipeline (e.g., `webpack`, `browserify`)
- The runtime environment (e.g., Node.js & browser)

## What is the goal of the LavaMoat project?

**The goal of LavaMoat** is _to protect JavaScript apps_ from supply chain attacks by _meeting them where they are_.

In other words: _you shouldn't need to rewrite your app from scratch_ to improve your software's security posture.

## Can I use LavaMoat with _X_?

**LavaMoat** is usable by any Node.js application, and is compatible with the following bundlers:

- [Webpack v4+](https://webpack.js.org)
- [Browserify](https://browserify.org)

**LavaMoat** is designed to be framework-agnostic—but if you run into problems, please read our [troubleshooting guide][troubleshooting].

[troubleshooting]: /guide/troubleshooting/
[supply-chain-attack]: https://en.wikipedia.org/wiki/Supply_chain_attack
