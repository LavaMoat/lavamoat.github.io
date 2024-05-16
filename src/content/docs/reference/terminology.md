---
title: Terminology
description: A reference page for LavaMoat and related terminology
---

## LavaMoat

An open source suite of tools for securing JavaScript projects against [software
supply chain attacks][supply chain attack]. LavaMoat uses [Hardened
JavaScript][] in tandem with user-configurable policies to
secure the development, build, and runtime environments of JavaScript
applications.

## Hardened JavaScript

> a.k.a. _Secure ECMAScript_ or _SES_

The sandbox used in [LavaMoat][]. It is a flavour of JavaScript for safely running third-party code. The [package](https://github.com/endojs/endo/tree/master/packages/ses#readme) is a [shim][] of JavaScript features proposed to [ECMA][] [TC39][]. See the [programming guide](https://github.com/endojs/endo/blob/master/packages/ses/docs/guide.md) for initial reading on usage. See the [secure computing guide](https://github.com/endojs/endo/blob/master/packages/ses/docs/secure-coding-guide.md) to learn more about the risks of untrusted javascript.

## SES

See [Hardened JavaScript][].

## Secure ECMAScript

See [Hardened JavaScript][].

## Supply Chain Attack

A software **supply chain attack** occurs when attackers infiltrate the
development or distribution process of software to insert malicious code into
legitimate software packages or updates. This type of _cyber attack_ exploits the
trust relationship between software vendors and their customers, aiming to
compromise user systems or steal data when the tainted software is deployed or
updated.

## Shim

TODO.

## ECMA

TODO.

## TC39

TODO. See [terminology](https://github.com/tc39/how-we-work/blob/main/terminology.md) for a glossary of the most common terms/considerations that come up while designing features for JavaScript at TC39.

## Prototype pollution

TODO.

[lavamoat]: #lavamoat
[hardened javascript]: #hardened-javascript
[supply chain attack]: #supply-chain-attack
[ecma]: #ecma
[tc39]: #tc39
[shim]: #shim
