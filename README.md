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
* SSR and Tests in Node.js feasible using [@prantlf/dom-lite].

## Synopsis

greetme.ts:

```ts
// import decorators from `bacom`
import { comp, prop, elem, event } from 'bacom'
// import a function returning HTMLTemplateElement
import template from './template.html'
// import a function returning CSSStylesheet or HTMLStyleElement
import style from './style.css'

// register a custom element with a stylesheet and a template content
@comp({ tag: 'greet-me': styles: [style], template })
export class GreetMeElement extends HTMLElement {
  // reflects a property to an attribute and back, watches for changes
  @prop({ type: 'string' })
  public name: string

  // pins an element with the ID `display-name` in the rendered content
  @elem()
  private displayName: HTMLElement

  // listens to the `click` event bubbled to the host
  @event()
  onClick(): void {
    this.classList.toggle('flash')
  }

  // updates the element content whenever a reflected property changes
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    this.displayName.textContent = newValue
  }
}
```

template.html:

```html
Hello, <span id=display-name></span>!
```

style.css:

```css
:host {
  --greetme-font-size: 1rem;
  font-size: var(--greetme-font-size);
}
```

test.html:

```html
<greet-me name=John></greet-me>
<!-- Renders: Hello, John! -->
<script type=module src=dist/greetme.esm.min.js></script>
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
<script src=https://unpkg.com/bacom@0.2.0/dist/index.umd.min.js></script>
<script src=yours/index.js></script>
```

All named exports are available in the global object `bacom`.

## Features

The following features are implemented:

* Registering of the custom element with the provided tag name.
* Synchronising values of a properties and attributes (reflection).
* Rendering the shadow DOM content from a template.
* Applying common styles by constructible stylesheets or `style` elements.
* Setting an child element to a property using an ID or an selector.
* Listening to an event on the host element or on a child element.
* Building with plugins for `eslint` and `rollup` to transform `css` and `html` files to functions returning `CSSStylesheet` and `HTMLTemplateElement`, including memoization for the best performance.

### SSR

```ts
import '@prantlf/dom-lite/global'
import './components/greetme'

const fragment = document.createDocumentFragment()
fragment.innerHTML = '<greet-me name=John></greet-me>'
const output = fragment.getInnerHTML({ includeShadowRoots: true })
// Output will contain:
// <greet-me name=John>
//   <template shadowroot=open>Hello, <span id=display-name>John</span>!</template>
// </greet-me>
```

### Test

```js
import '@prantlf/dom-lite/global'
import './components/greetme'
import suite from 'tehanu'
import assert from 'assert'

const test = suite('prop')

test('greets with the specified name', () => {
  const el = document.createElement('greet-me')
  el.name = 'John'
  assert.equal(el.shadowRoot.innerHTML, 'Hello, <span id=display-name>John</span>!')
})
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Lint and test your code using `npm test`.

## License

Copyright (c) 2021 Ferdinand Prantl

Licensed under the MIT license.

[@prantlf/dom-lite]: https://github.com/prantlf/dom-lite#readme
