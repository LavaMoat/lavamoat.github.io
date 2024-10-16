---
title: Glossary
description: Terminology for LavaMoat and related technologies
---

This glossary provides definitions for terms used in the context of LavaMoat and related technologies.

## Compartment

Compartments are a mechanism for isolating and providing limited power to programs within a shared realm. Compartments are necessary for [Hardened JavaScript][hardened-javascript] and are described in the [Compartments Proposal][compartments-proposal-ext].

## ECMA-262

> See [ECMAScript][].

## ECMAScript

ECMAScript is the standard upon which JavaScript is based. The standard is defined in the [ECMA-262 specification][ecma-262-ext]. The specification is maintained by the [TC39][] technical committee.

## Endo

Endo is an [open source project][endo-ext] providing a distributed sandbox for JavaScript. The foundation of Endo is [Hardened JavaScript][hardened-javascript].

## Hardened JavaScript

> a.k.a. _Secure ECMAScript_ or _SES_

A standards-track JavaScript proposal concerned with safely running untrusted code. The [`ses` package][ses-ext] is a [shim][] of JavaScript features proposed for [ECMAScript][].

SES can also be conceptualized as a subset of JavaScript.

SES is the backbone of both [Endo][] and [LavaMoat][].

:::note[Resources]

- [SES on GitHub][ses-ext], part of the [Endo][] project
- [Secure ECMAScript TC39 proposal][ses-proposal-ext]
- [Compartment TC39 proposal][compartments-proposal-ext]
- [Video: Hardened JavaScript][hardened-js-video-ext], an introduction by Kris Kowal
- [Secure computing guide][ses-secure-ext] to learn more about the risks of untrusted JavaScript
- [Programming guide][ses-programming-ext] for an introduction
- A [helpful diagram][ses-diagram-ext] showing SES as a subset of JavaScript

:::

## Intrinsic

A built-in value that is required by the ECMA262 specification.

If an intrinsic is accessible to [ECMAScript][] code, it is a [primordial][].

See the [TC39 glossary][tc39-glossary-intrinsic-ext] for more information.

## LavaMoat

An open source suite of tools for securing JavaScript projects against [**software supply chain attacks**][supply-chain-attack]. LavaMoat uses [Hardened JavaScript][hardened-javascript] in tandem with user-configurable policies to secure the development, build, and runtime environments of JavaScript applications.

## Lockdown

The `lockdown()` function introduced by [SES][], when called creates a [hardened JavaScript][hardened-javascript] environment that protects against [prototype pollution][prototype-pollution].

:::note[Resources]

- [Lockdown](https://github.com/endojs/endo/tree/master/packages/ses#lockdown) on GitHub, part of the [`ses` package][ses-ext]
- [What Lockdown does to JavaScript](https://github.com/endojs/endo/blob/master/packages/ses/docs/guide.md#what-lockdown-does-to-javascript) in the Programming Guide
- [Lockdown()](https://github.com/endojs/endo/blob/master/packages/ses/docs/reference.md#lockdown) in the Programming Reference

:::

## Powers

There's a concept in [Hardened JavaScript][hardened-javascript] called _powers_. Powers are the capabilities that a compartment has access to. The compartment can only access the powers that it has been granted. For the specific use-case that [LavaMoat][] Policy provides, Powers are effectively the globals and built-in (in case of Node.js programs) modules that are available to the compartment.

## Object Capability Programming

> a.k.a. _OCAP_ or _object-capability model_

Object capability programming is a security model that uses the concept of _object capabilities_ to control access to resources. In this model, an object's authority to access resources is determined by the capabilities it holds. This approach is used in [Hardened JavaScript][hardened-javascript] to provide a secure environment for running untrusted code.

:::note[Resources]

- [Object-capability model][ocap-wiki-ext] on Wikipedia
- [Awesome OCAP][ocap-awesome-ext] on GitHub
- [Video: OCAP Programming in Secure JavaScript][ocap-video-ext] by Mark S. Miller
- [Robust Composition: Towards a Unified Approach to Access Control and Concurrency Control][ocap-thesis-ext] by Mark S. Miller

:::

## OCAP

> See [Object Capability Programming][object-capability-programming].

## Override Mistake

ECMAScript behavior wherein a `TypeError` is thrown (in strict mode) for code `T[K] = ...` when `K` is a non-writable property in the prototype of `T`.

See [TC39's definition][tc39-glossary-override-mistake-ext] for more information.

## Primordial

An intrinsic value that is accessible to ECMAScript code and required to exist before any ECMAScript code runs.

See the [TC39 glossary][tc39-glossary-primordial-ext] for more information.

## Prototype poisoning

> See [Prototype pollution][prototype-pollution].

## Prototype pollution

A class of JavaScript vulnerabilities and bugs where a modification is inadvertently made on an object prototype. For example, using unsanitized user input for keys, the following:

```js
myObj[key] = {};
myObj[key].totallySafe = true;
```

could result in overriding functions on the global `Object` prototype:

```js
myObj['__proto__'].totallySafe = val;
const uncheckedObj = {};
console.log(uncheckedObj.totallySafe); // true
```

## Realm

A Realm is:

- a set of [intrinsic][] objects
- an ECMAScript global environment
- all of the ECMAScript code that is loaded within the scope of that global environment
- other associated state and resources (i.e. a global object and an associated set of primordial objects).

See the [ECMAScript Spec][ecma-262-realms-ext] for more information.

## Scuttling

Destroying all possible global references with [LavaMoat][].

See the [LavaMoat docs][lavamoat-scuttling-ext] for more information.

## SES

> See [Hardened JavaScript][hardened-javascript].

## Secure ECMAScript

> See [Hardened JavaScript][hardened-javascript].

## Supply Chain Attack

A software **supply chain attack** occurs when attackers infiltrate the development or distribution process of software to insert malicious code into legitimate software packages or updates. This type of _cyber attack_ exploits the trust relationship between software vendors and their customers, aiming to compromise user systems or steal data when the tainted software is deployed or updated.

## Shim

A shim is a library that transparently intercepts API calls and changes the arguments passed, handles the operation itself or redirects the operation elsewhere. In JavaScript, shims typically provide standards-track APIs to JavaScript environments which do not yet implement them.

## TC39

A technical committee which maintains the [ECMAScript][] standard.

:::note[Resources]

- TC39 maintains its own [glossary of terms][tc39-glossary-ext] used when designing the [ECMAScript][] specification; some of these terms are referenced in this glossary.
- Read about [TC39's scope][tc39-ext].

:::

[compartments-proposal-ext]: https://github.com/tc39/proposal-compartments
[ecma-262-ext]: https://ecma-international.org/publications-and-standards/standards/ecma-262
[ecma-262-realms-ext]: https://tc39.es/ecma262/#sec-code-realms
[ecmascript]: #ecmascript
[endo]: #endo
[endo-ext]: https://github.com/endojs/endo#readme
[hardened-javascript]: #hardened-javascript
[hardened-js-video-ext]: https://youtu.be/RZ7bBIU8DRc
[intrinsic]: #intrinsic
[lavamoat]: #lavamoat
[lavamoat-scuttling-ext]: https://github.com/LavaMoat/LavaMoat/blob/main/docs/scuttling.md
[object-capability-programming]: #object-capability-programming
[ocap-awesome-ext]: https://github.com/dckc/awesome-ocap#readme
[ocap-thesis-ext]: http://erights.org/talks/thesis/
[ocap-video-ext]: https://youtu.be/YcWXqHPui_w
[ocap-wiki-ext]: https://en.wikipedia.org/wiki/Object-capability_model
[primordial]: #primordial
[prototype-pollution]: #prototype-pollution
[ses]: #ses
[ses-ext]: https://github.com/endojs/endo/tree/master/packages/ses#readme
[ses-diagram-ext]: https://github.com/endojs/Jessie/blob/main/README.md#subsetting-ecmascript
[ses-programming-ext]: https://github.com/endojs/endo/blob/master/packages/ses/docs/guide.md
[ses-proposal-ext]: https://github.com/tc39/proposal-ses
[ses-secure-ext]: https://github.com/endojs/endo/blob/master/packages/ses/docs/secure-coding-guide.md
[shim]: #shim
[supply-chain-attack]: #supply-chain-attack
[tc39-ext]: https://ecma-international.org/technical-committees/tc39/
[tc39-glossary-ext]: https://ecma-international.org/publications-and-standards/standards/ecma-262
[tc39-glossary-intrinsic-ext]: https://ecma-international.org/publications-and-standards/standards/ecma-262#intrinsic
[tc39-glossary-override-mistake-ext]: https://ecma-international.org/publications-and-standards/standards/ecma-262#override-mistake
[tc39-glossary-primordial-ext]: https://ecma-international.org/publications-and-standards/standards/ecma-262#primordial
[tc39]: #tc39
