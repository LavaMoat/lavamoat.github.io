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

## How to secure your app against supply-chain attacks

1. Harden your project's configuration with [@lavamoat/harden][lavamoat-harden]
   1.a. Or control dependency lifecycle scripts (eg. "postinstall") via [@lavamoat/allow-scripts][lavamoat-allowscripts]
2. Run your server or build process in [lavamoat-node][lavamoat-node]
3. Build your ui with our [Webpack5 plugin][lavamoat-webpack] or use LavaMoat for [Browserify][lavamoat-browserify]

:::tip

On modern versions of `npm`, `yarn`, or `pnpm`, [`@lavamoat/harden`][lavamoat-harden] is the preferred entry point and replaces `@lavamoat/allow-scripts`. `@lavamoat/harden` covers lifecycle scripts alongside other supply-chain hardening settings. Just doing the first step is a great improvement to your supply chain security.

:::

[lavamoat-harden]: /guides/harden
[lavamoat-allowscripts]: /guides/allow-scripts
[lavamoat-node]: /guides/lavamoat-node
[lavamoat-browserify]: /guides/browserify
[lavamoat-webpack]: /guides/webpack
[node-download]: https://nodejs.org/en/download
[node]: https://nodejs.org
