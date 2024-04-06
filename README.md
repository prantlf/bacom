## Base for Web Components (bacom)

[![NPM version](https://badge.fury.io/js/bacom.png)](http://badge.fury.io/js/bacom)
[![Dependency Status](https://david-dm.org/prantlf/bacom.svg)](https://david-dm.org/prantlf/bacom)
[![devDependency Status](https://david-dm.org/prantlf/bacom/dev-status.svg)](https://david-dm.org/prantlf/bacom#info=devDependencies)

Basic library for writing lightweight web components. Suitable for low-level web components in UI libraries. Ensures standard behaviour of custom elements with shadow DOM efficiently.

* Tiny size - 2.19 kB minified, 1.1 kB gzipped, 963 B brotlied.
* Consumable as ESM, UMD and CJS modules.
* Zero dependencies.
* Written in TypeScript.
* Templates and stylesheets compilable from `.html` and `.css`, `.less` or `.scss` sources.
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
@comp({ tag: 'greet-me', styles: [style], template })
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
<!-- Renders "Hello, John!" -->
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
<script src=https://unpkg.com/bacom@1.0.0/dist/index.umd.min.js></script>
<script src=yours/index.js></script>
```

All named exports are available in the global object `bacom`.

## Features

The following features are implemented:

* Registering of the custom element with the provided tag name.
* Synchronising values of a properties and attributes (reflection).
* Rendering the shadow DOM content from a template.
* Applying common styles by constructible stylesheets.
* Setting an child element to a property using an ID or an selector.
* Listening to an event on the host element or on a child element.
* Building with plugins for `esbuild`, `rollup` and `webpack` to transform `css`, `less`, `scss` and `html` files to functions returning `CSSStylesheet` and `HTMLTemplateElement`, including memoization for the best performance.

### Build

If you want to keep stylesheets and templates in separate `.css` or `.less` or `.scss` and `.html` files instead of keeping the in strings in the script code, you will need bundler plugins.

**Note**: If you compile your stylesheets with SASS using one of the `bacom/tools/sass/*` plugins, you have to include the dependency on `sass` in your project yourself:

```sh
npm i -D sass
yarn add -D sass
pnpm i -D sass
```

Similarly, if you compile your stylesheets with LESS using one of the `bacom/tools/less/*` plugins, you have to include the dependency on `less` in your project yourself:

```sh
npm i -D less
yarn add -D less
pnpm i -D less
```

Plugins for [rollup]:

* `bacom/tools/less/rollup`: compiles LESS sources to a string with CSS; parameters (include, exclude, minify, options)
* `bacom/tools/sass/rollup`: compiles SASS sources to a string with CSS; parameters (include, exclude, minify, options)
* `bacom/tools/style/rollup`: compiles a CSS source to a string; parameters (include, exclude, minify)
* `bacom/tools/templ/rollup`: compiles a HTML source to a string; parameters (include, exclude, minify)

```js
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { minify } from 'rollup-plugin-swc-minify'
import sourcemaps from 'rollup-plugin-sourcemaps'
import style from 'bacom/tools/style/rollup'
import templ from 'bacom/tools/templ/rollup'

export default {
  input: 'src/index.ts',
  output: [{
    file: 'dist/index.min.js', format: 'iife', sourcemap: true
  }],
  plugins: [
    nodeResolve(), style({ minify: true }), templ({ minify: true }),
    typescript(), sourcemaps(), minify()
  ]
}
```

Plugin parameters:

| Name    | Type     | Description                                                                  |
| ------- | -------- | ---------------------------------------------------------------------------- |
| include | string[] | wildcard expressions matching file names to process                          |
| exclude | string[] | wildcard expressions matching file names to ignore                           |
| minify  | boolean  | minify the output stylesheet                                                 |
| options | object   | the [`options` parameter] for the [`less` compiler] or the [`sass` compiler] |

Plugins for [esbuild]:

* `bacom/tools/less/esbuild`: compiles LESS sources to a string with CSS; parameters (include, exclude, minify, options)
* `bacom/tools/sass/esbuild`: compiles SASS sources to a string with CSS; parameters (include, exclude, minify, options)
* `bacom/tools/style/esbuild`: compiles a CSS source to a string; parameters (include, exclude, minify)
* `bacom/tools/templ/esbuild`: compiles a HTML source to a string; parameters (include, exclude, minify)

```js
const { build } = require('esbuild')
const style = require('bacom/tools/style/esbuild')
const templ = require('bacom/tools/templ/esbuild')

const targets = [
  {
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.min.js',
    format: 'iife', sourcemap: true, bundle: true, minify: true,
    plugins: [style({ minify: true }), templ({ minify: true })]
  }
]

Promise.all(targets.map(build)).catch(() => process.exitCode = 1)
```

Plugin parameters:

| Name    | Type    | Description                                                                  |
| ------- | ------- | ---------------------------------------------------------------------------- |
| include | string  | regular expression matching file names to process                            |
| exclude | string  | regular expression matching file names to ignore                             |
| minify  | boolean | minify the output stylesheet                                                 |
| options | object  | the [`options` parameter] for the [`less` compiler] or the [`sass` compiler] |

Plugins for [webpack]:

* `bacom/tools/less/webpack`: compiles LESS sources to a string with CSS; parameters (minify, options)
* `bacom/tools/sass/webpack`: compiles SASS sources to a string with CSS; parameters (minify, options)
* `bacom/tools/style/webpack`: compiles a CSS source to a string; parameters (minify)
* `bacom/tools/templ/webpack`: compiles a HTML source to a string; parameters (minify)

```js
const path = require('path')
const nodeExternals = require('webpack-node-externals')

export default [
  {
    entry: './src/index.ts',
    output: {
      filename: 'index.min.js',
      path: path.resolve(__dirname, 'dist'),
      module: true,
      library: { type: 'iife' }
    },
    mode: 'production',
    devtool: 'source-map',
    module: {
      rules: [
        { test: /\.ts$/, use: 'ts-loader' },
        { test: /\.css$/, use: 'bacom/tools/style/webpack' },
        { test: /\.t?html$/, use: 'bacom/tools/templ/webpack' }
      ]
    }
  }
]
```

Plugin parameters:

| Name    | Type     | Description                                                                  |
| ------- | -------- | ---------------------------------------------------------------------------- |
| minify  | boolean  | minify the output stylesheet (`true` by default if `mode === 'production'`)  |
| options | object   | the [`options` parameter] for the [`less` compiler] or the [`sass` compiler] |

### Custom Rendering

If you do not pass a template as a parameter to the `comp` decorator, you can implement the `render` method to populate the shadow DOM yourself. You will still be able to use the decorators `elem` and `event` and refer to the Shadow DOM content.

```ts
import { comp, prop, elem } from 'bacom'

@comp({ tag: 'greet-me' })
export class GreetMeElement extends HTMLElement {
  @prop({ type: 'string' })
  public name: string

  @elem()
  private displayName: HTMLElement

  render(): void {
    this.shadowRoot = 'Hello, <span id=display-name></span>!'
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    this.displayName.textContent = newValue
  }
}
```

If you implement the `render` method, it will be called even if you pass the `template` parameter to the `comp` decorator. You can use it to update the Shadow DOM content.

### SSR

```ts
import '@prantlf/dom-lite/global'
import './components/greetme'

const fragment = document.createDocumentFragment()
fragment.innerHTML = '<greet-me name=John></greet-me>'
const output = fragment.getInnerHTML({ includeShadowRoots: true })
// The output will contain:
// <greet-me name=John>
//   <template shadowroot="open">Hello, <span id="display-name">John</span>!</template>
// </greet-me>
```

### Test

```js
import '@prantlf/dom-lite/global'
import './components/greetme'
import suite from 'tehanu'
import assert from 'assert'

const test = suite('greet-me')

test('greets with the specified name', () => {
  const el = document.createElement('greet-me')
  el.name = 'John'
  assert.equal(el.shadowRoot.innerHTML, 'Hello, <span id="display-name">John</span>!')
})
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Test your code using `npm test`.

## License

Copyright (c) 2021-2024 Ferdinand Prantl

Licensed under the MIT license.

[@prantlf/dom-lite]: https://github.com/prantlf/dom-lite#readme
[rollup]: https://rollupjs.org/
[esbuild]: https://esbuild.github.io/
[webpack]: https://webpack.js.org/
[`options` parameter]: https://sass-lang.com/documentation/js-api/interfaces/Options
[`less` compiler]: https://lesscss.org/usage/#programmatic-usage
[`sass` compiler]: https://sass-lang.com/documentation/js-api
