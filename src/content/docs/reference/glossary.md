---
title: Glossary
description: Terminology for LavaMoat and related technologies
---

## Endo

Endo is an [open source project][endo-ext] providing a distributed sandbox for JavaScript. The foundation of Endo is [Hardened JavaScript][].

## Hardened JavaScript

> a.k.a. _Secure ECMAScript_ or _SES_

The sandbox used in [LavaMoat][]. It is a flavour of JavaScript for safely running third-party code. The [package][ses-ext] is a [shim][] of JavaScript features proposed for [ECMAScript][].

:::note[Resources]

- [SES on GitHub][ses-ext], part of the [Endo][] project
- [Video: Hardened JavaScript][hardened-js-video-ext], an introduction by Kris Kowal
- [Secure computing guide][ses-secure-ext] to learn more about the risks of untrusted JavaScript
- [Programming guide][ses-programming-ext] for an introduction

:::

## LavaMoat

An open source suite of tools for securing JavaScript projects against [software supply chain attacks][supply chain attack]. LavaMoat uses [Hardened JavaScript][] in tandem with user-configurable policies to secure the development, build, and runtime environments of JavaScript applications.

## Object Capability Programming

> a.k.a. _OCAP_ or _object-capability model_

Object capability programming is a security model that uses the concept of _object capabilities_ to control access to resources. In this model, an object's authority to access resources is determined by the capabilities it holds. This approach is used in [Hardened JavaScript][] to provide a secure environment for running untrusted code.

:::note[Resources]

- [Object-capability model][ocap-wiki-ext] on Wikipedia
- [Awesome OCAP][ocap-awesome-ext] on GitHub
- [Video: OCAP Programming in Secure JavaScript][ocap-video-ext] by Mark S. Miller
- [Robust Composition: Towards a Unified Approach to Access Control and Concurrency Control][ocap-thesis-ext] by Mark S. Miller

:::

## SES

> See [Hardened JavaScript][].

## Secure ECMAScript

> See [Hardened JavaScript][].

## Supply Chain Attack

A software **supply chain attack** occurs when attackers infiltrate the development or distribution process of software to insert malicious code into legitimate software packages or updates. This type of _cyber attack_ exploits the trust relationship between software vendors and their customers, aiming to compromise user systems or steal data when the tainted software is deployed or updated.

## Shim

A shim is a library that transparently intercepts API calls and changes the arguments passed, handles the operation itself or redirects the operation elsewhere. In JavaScript, shims typically provide standards-track APIs to JavaScript environments which do not yet implement them.

## ECMA-262

> See [ECMAScript][].

## ECMAScript

ECMAScript is the standard upon which JavaScript is based. The standard is defined in the [ECMA-262 specification][ecma-262-ext]. The specification is maintained by the [TC39][] technical committee.

## TC39

A technical committee which maintains the [ECMAScript][] standard.

:::note[Resources]

- TC39 maintains its own [glossary of terms][tc39-glossary-ext] used when designing the [ECMAScript][] specification.
- Read about [TC39's scope][tc39-ext].

:::

## Prototype pollution

TODO.

[ecma-262-ext]: https://ecma-international.org/publications-and-standards/standards/ecma-262
[ecmascript]: #ecmascript
[endo-ext]: https://github.com/endojs/endo#readme
[endo]: #endo
[hardened javascript]: #hardened-javascript
[hardened-js-video-ext]: https://youtu.be/RZ7bBIU8DRc
[lavamoat]: #lavamoat
[ocap-awesome-ext]: https://github.com/dckc/awesome-ocap#readme
[ocap-thesis-ext]: http://erights.org/talks/thesis/
[ocap-video-ext]: https://youtu.be/YcWXqHPui_w
[ocap-wiki-ext]: https://en.wikipedia.org/wiki/Object-capability_model
[ses-ext]: https://github.com/endojs/endo/tree/master/packages/ses#readme
[ses-programming-ext]: https://github.com/endojs/endo/blob/master/packages/ses/docs/guide.md
[ses-secure-ext]: https://github.com/endojs/endo/blob/master/packages/ses/docs/secure-coding-guide.md
[shim]: #shim
[supply chain attack]: #supply-chain-attack
[tc39-ext]: https://ecma-international.org/technical-committees/tc39/
[tc39-glossary-ext]: https://ecma-international.org/publications-and-standards/standards/ecma-262
[tc39]: #tc39
