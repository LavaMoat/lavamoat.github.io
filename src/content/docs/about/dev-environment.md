---
title: Securing the Development Environment
description: Securing the Development Environment with LavaMoat
---

In this document, we'll explain how LavaMoat protects your development environment.

## Safer Installs

The main vector for supply chain attacks in the development environment is _installing software from the internet_.

If you chortle disapprovingly at `curl | bash` scripts, why are you still running `npm install`?

### The Problem With `npm install`

`npm`'s default behavior is to execute the `postinstall` lifecycle script of every installed package. It's no longer just "data in transit" or "data at rest"--it becomes "data at runtime" as well.

### A Crude Solution

Executing `postinstall` scripts can be trivially disabled by using the `--ignore-scripts` flag (similarly via config files or with other package managers). Great! Problem solved, right?

Yes, but...

Since you're ignoring scripts, you've traded convenience for safety—a lopsided trade, at that. Certainly, _your own packages_ should run `postinstall` or `prepare` scripts. Certainly, any _native_ packages in your dependency tree won't work—they won't compile or fetch blobs. Certainly, you want to use something like [`husky`][husky-ext] to set up some Git hooks—that won't work either.

Now you have the displeasure of implementing a workaround or running these manually (which neither you nor your teammates will _ever_ forget to do). _Extra work!_

If you'd rather not: LavaMoat will show you the way.

### `@lavamoat/allow-scripts`: An Elegant Solution

Using LavaMoat's `allow-scripts` tool, you can configure (in `package.json`) a list of packages _explicitly allowed_ to run install scripts. When used, no _new, unexpected_ install scripts will be allowed to run. As a failsafe mechanism, `@lavamoat/allow-scripts` also installs a package with a failing install script--this will abort installation if the configuration is accidentally removed.

:::tip[Further Reading]

- `@lavamoat/allow-scripts`: [User's Guide][allow-scripts-guide]
- `@lavamoat/allow-scripts`: [Reference][allow-scripts-reference]

:::

Next, we'll discuss how LavaMoat secures the build process.

## Safer Builds

Much like how LavaMoat [secures the runtime environment][runtime-environment], it also secures build processes. Since LavaMoat can run in both Node.js and the browser, "build time" is really just "runtime" in a Node.js context.

To recap, LavaMoat secures the runtime environment by:

1. Preventing modification of JavaScript's built-in data types (`Object`, `String`, `Number`, `Array`, etc.)
2. Providing granular control over access to the global platform API (`document`, `process`, `WebSocket`, etc.)
3. Providing control over access to packages themselves (including Node.js' built-in modules)

Just like how LavaMoat secures the browser, it also secures Node.js—and thus _any_ Node.js program run in your development environment—including the build process.

:::tip[Further Reading]

Read more about how LavaMoat secures the runtime environment in the [Runtime Security Overview document][runtime-environment] document.

:::

[runtime-environment]: /about/runtime-environment
[allow-scripts-guide]: /guide/allow-scripts
[allow-scripts-reference]: /reference/allow-scripts
[husky-ext]: https://typicode.github.io/husky/
