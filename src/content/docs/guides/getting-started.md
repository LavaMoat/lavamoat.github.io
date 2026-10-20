---
title: Getting Started
description: Getting Started securing your JavaScript with LavaMoat
sidebar:
  order: 1
---

## Prerequisites

LavaMoat is distributed as a [Node.js][node] command-line tool. You'll need an LTS version of Node.js:

- Node.js LTS (recommended) _or_
- Node.js v22 (minimum)

:::tip

Don't have Node.js installed? [Download and install Node.js from the official site.][node-download]

:::

## How to Secure Your App Against Supply-Chain Attacks

1. Harden your project's configuration with [@lavamoat/harden][]
   1. Or control dependency lifecycle scripts (eg. "postinstall") via [@lavamoat/allow-scripts][]
2. Run your server or tooling with [@lavamoat/node][]
3. Build your UI with the [LavaMoat Webpack plugin][@lavamoat/webpack] or use [LavaMoat for Browserify][lavamoat-browserify]

:::tip

On modern versions of `npm`, `yarn`, or `pnpm`, [`@lavamoat/harden`][lavamoat-harden] is the preferred entry point and replaces `@lavamoat/allow-scripts`. `@lavamoat/harden` covers lifecycle scripts alongside other supply-chain hardening settings. Just doing the first step is a great improvement to your supply chain security.

:::

:::caution[Legacy LavaMoat Node.js runtime]

The `lavamoat` package is no longer under active development. Its replacement is [@lavamoat/node][], which supports ESM. You can still read the [legacy documentation](/guides/legacy-lavamoat-node) for more information.

:::

[@lavamoat/harden]: /guides/harden
[@lavamoat/allow-scripts]: /guides/allow-scripts
[@lavamoat/node]: /guides/lavamoat-node
[lavamoat-browserify]: /guides/browserify
[@lavamoat/webpack]: /guides/webpack
[node-download]: https://nodejs.org/en/download
[node]: https://nodejs.org
