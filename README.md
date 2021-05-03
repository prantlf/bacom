## Base for Web Components (bacom)

[![NPM version](https://badge.fury.io/js/bacom.png)](http://badge.fury.io/js/bacom)
[![Build Status](https://github.com/prantlf/bacom/workflows/Test/badge.svg)](https://github.com/prantlf/bacom/actions)
[![Dependency Status](https://david-dm.org/prantlf/bacom.svg)](https://david-dm.org/prantlf/bacom)
[![devDependency Status](https://david-dm.org/prantlf/bacom/dev-status.svg)](https://david-dm.org/prantlf/bacom#info=devDependencies)

Basic library for writing lightweight web components. Suitable for low-level web components in UI libraries. Ensures standard behaviour of custom elements with shadow DOM efficiently.

* Tiny size - 2.27 kB minified, 1.13 kB gzipped.
* Consumable as ESM, UMD and CJS modules.
* Zero dependencies.
* Written in TypeScript.
* Tests in Node.js feasible using [dom-lite].

## Synopsis

```tsx
import { comp, prop, elem, event } from 'bacom' // decorators and helpers
import style from './style.css'        // import CSSStylesheet or HTMLStyleElement
import template from './template.html' // import HTMLTemplateElement

@comp({ tag: 'greet-me': styles: [style], template }) // register a custom element
export class GreetMeElement extends HTMLElement {
  @prop({ type: 'string' }) // enable reflection to an attribute
  public name: string
  @elem()
  private displayName: HTMLElement

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    this.displayName.textContent = newValue
  }

  @event()
  onClick(): void {
    this.classList.toggle('flash')
  }

  static observedAttributes = ['name']
}
```

template.html:

```html
Hello, <span id=displayName></span>!
```

test.html:

```html
<greet-me name=John></greet-me>
<!-- Renders: Hello, John! -->
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
<script src=https://unpkg.com/bacom@0.1.0/dist/index.umd.min.js></script>
<script src=yours/index.js></script>
```

## Features

The following features are implemented:

* Registering of the custom element.
* Synchronising (reflection) of values of a properties and attributes.
* Rendering of the shadow DOM content from a template.
* Applying common styles by constructible stylesheets or `style` elements.
* Setting an element to a property.
* Listening on an event.
* Plugins for `eslint` and `rollup` to transform `css` and `html` files as functions returning `CSSStylesheet` and `HTMLTemplateElement`.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Lint and test your code using `npm test`.

## License

Copyright (c) 2021 Ferdinand Prantl

Licensed under the MIT license.

[dom-lite]: https://github.com/litejs/dom-lite#readme
