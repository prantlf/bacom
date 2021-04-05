## Base for Web Components (bacom)

[![NPM version](https://badge.fury.io/js/bacom.png)](http://badge.fury.io/js/bacom)
[![Build Status](https://github.com/prantlf/bacom/workflows/Test/badge.svg)](https://github.com/prantlf/bacom/actions)
[![Dependency Status](https://david-dm.org/prantlf/bacom.svg)](https://david-dm.org/prantlf/bacom)
[![devDependency Status](https://david-dm.org/prantlf/bacom/dev-status.svg)](https://david-dm.org/prantlf/bacom#info=devDependencies)

Basic library for writing web components. Ensures standard behaviour of custom elements with shadow DOM efficiently.

* Tiny size - 2.04 kB minified, 992 B gzipped.
* Consumable as ESM, UMD and CJS modules.
* Zero dependencies.
* Written in TypeScript.
* Tests in Node.js feasible using [dom-lite].

## Synopsis

```tsx
import { comp, prop } from 'bacom' // decorators and helpers
import style from './style.css' // import CSSStylesheet or HTMLStyleElement

@comp({ tag: 'greet-me': styles: [style] }) // register a custom element
export class GreetMeElement extends HTMLElement {
  @prop({ type: 'string' }) // enable reflection to an attribute
  public name: string

  render(): HTMLElement {
    // your preferred library to create Element or DocumentFragment
    return <>Hello, <span class="name">{this.name}</span>!</>
  }
}
```

## Installation

You can install this package using your favourite Node.js package manager:

```sh
npm i -D bacom
yarn add -D bacom
pnpm i -D bacom
```

If you do not want to bundle this package in your build output, you can load it separately on your web page before your script bundle:

```html
<script src=https://unpkg.com/bacom@0.0.1/dist/index.umd.min.js></script>
<script src=yours/index.js></script>
```

## Features

The following features are implemented:

* Registering of the custom element.
* Synchronising (reflection) of values of a property and attribute.
* Rendering of the shadow DOM content delayed by a micro-task.
* Applying common styles by constructible stylesheets or `style` elements.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Lint and test your code using `npm test`.

## License

Copyright (c) 2021 Ferdinand Prantl

Licensed under the MIT license.

[dom-lite]: https://github.com/litejs/dom-lite#readme
