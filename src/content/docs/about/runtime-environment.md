---
title: LavaMoat at Runtime
description: How LavaMoat secures the runtime environment
sidebar:
  order: 3
---

## Runtime protections

You can use lavamoat to prevent malicious code introduced into a package from running.

The LavaMoat runtime reduces the supply chain risk by:

1. Preventing modification of JavaScript's built-in data types (`Object`, `String`, `Number`, `Array`, etc.)
2. Providing granular control over access to the global platform API (`document`, `process`, `WebSocket`, etc.)

Both are provided by [SES][SesGithub] containers. Platform API access is granted by a policy file that LavaMoat can generate and allow the project to selectively customize. All details of policy file structure are documented in the [Policy file explained][PolicyDoc] doc.

### Hardened Javascript (SES)

[SES][SesGithub] is the sandbox used in LavaMoat. See SES's [secure computing guide][SesComputingGuide] to learn more about the risks of untrusted javascript.

SES provides `Compartment` and `lockdown` which LavaMoat uses to provide two distinct protections:

- `lockdown` hardens the runtime environment, preventing the JavaScript intrinsics from being tampered with. It therefore stops prototype poisoning attacks from affecting the security of `Compartment` and the rest of the application
- `Compartment` is used internally to allow isolating each dependency and awarding it access to only the globals and imports allowed by the policy.

### Scuttling

Since LavaMoat is selectively giving copies of global references to confined parts of the application, there no longer is a need for the actual global references to exist.

We apply a step we call "Scuttling" early on in the initialization of the app to destroy all the global references we can possibly destroy after we've captured them. So even if the app code accidentally gives a dependency some powers that lead to it reaching the globalThis - there's not much left there to use.

### LavaMoat runtime protection in Node.js

Run your server or app building code with protections via [LavaMoat Node][lavamoat-node]

TODO: mention endomoat maybe

### LavaMoat runtime protection in the browser

LavaMoat is designed to work in the browser in tandem with a strict Content Security Policy. As a result, the confinement provided by Compartments is not created at runtime, but inserted into the JavaScript bundle at build time, thus avoiding the use of `eval` or `new Function` which are prohibited under CSP.

As a result, to secure your code in the browser, you need to use one of the supported bundlers.

[LavaMoat plugin for Webpack5][lavamoat-webpack] (beta)

[LavaMoat for Browserify][lavamoat-browserify]

[lavamoat-node]: /guides/lavamoat-node
[lavamoat-browserify]: /guides/browserify
[lavamoat-webpack]: /guides/webpack
[sesgithub]: https://github.com/endojs/endo/tree/master/packages/ses
[policydoc]: /reference/policy
[sescomputingguide]: https://github.com/endojs/endo/blob/master/packages/ses/docs/secure-coding-guide.md
