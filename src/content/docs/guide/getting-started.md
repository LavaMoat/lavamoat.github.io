---
title: Getting Started
description: Getting Started securing your JavaScript with LavaMoat
sidebar:
  order: 1
---

## Prerequisites

LavaMoat is distributed as a [Node.js](https://nodejs.org) command-line tool. You'll need an LTS version of Node.js:

- Node.js v20.0.0 (recommended) _or_
- Node.js v16.20.0 (minimum)

:::tip

Don't have Node.js installed? [Download and install Node.js from the official site.](https://nodejs.org/en/download)

:::

## How to secure your app against supply-chain attacks

1. Control dependency lifecycle scripts (eg. "postinstall") via [@lavamoat/allow-scripts][lavamoat-allowscripts]
2. run your server or build process in [lavamoat-node][lavamoat-node]
3. build your ui with our [Webpack5 plugin (beta)][lavamoat-webpack] or use LavaMoat for [Browserify][lavamoat-browserify]

:::tip

Even starting with adding just step 1 - the `allow-scripts`, is a great improvement to your supply chain security. Majority of supply-chain attacks are delivered via lifecycle scripts.

:::

[lavamoat-allowscripts]: /guides/allow-scripts
[lavamoat-node]: /guides/lavamoat-node
[lavamoat-browserify]: /guides/browserify
[lavamoat-webpack]: /guides/webpack
