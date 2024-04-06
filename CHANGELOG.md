# Changes

## [2.0.0](https://github.com/prantlf/bacom/compare/v1.0.0...v2.0.0) (2024-04-06)

### Features

* Remove support for style elements, retain only constructible stylesheets ([6883934](https://github.com/prantlf/bacom/commit/688393448407819664db11fbac9ecb7055612ca3))

### BREAKING CHANGES

Styles for web components are assigned only via
constructible stylesheets now. All browsers support the modern interface
in the meanwhile. The function `style` returns only `CSSStyleSheet`. The
boolean flag `constructibleStyleSheets` is not exported any more.

## [1.0.0](https://github.com/prantlf/bacom/compare/v0.6.0...v1.0.0) (2023-03-27)

### Bug Fixes

* Support ES and CJS build scripts properly ([693e2c3](https://github.com/prantlf/bacom/commit/693e2c39137f5c3a938da0c053106c393d426fd7))
* Upgrade dependencies ([c432a3a](https://github.com/prantlf/bacom/commit/c432a3a86c9a47c464d6aa75237ad0ebf4e1b892))

### BREAKING CHANGES

* The minimum supported version of Node.js increased from 12 to 16.14.
* CJS variants of build plugins don't have the extension '.js' any more. Require them with no extension, just like you import them in ES scripts.

## 0.6.0 (2021-12-29)

* Add webpack loaders to support webpack users.

## 0.5.1 (2021-12-29)

* Fix stack trace of source maps for stylesheets and templates.

## 0.5.0 (2021-12-26)

* Add plugins for LESS and SASS sources.
* Fix source maps of stylesheets and templates compiled with esbuild.
* Improve performance of counting lines in source stylesheets and templates.
* Improve performance of minifying by using just the best minifier.

## 0.4.0 (2021-05-15)

* Minify CSS and HTML bundled by esbuild and rollup plugins.
* Cache once minified files, in case the bundler asks for the same file again.
* Make reflection properties configurable.

## 0.3.1 (2021-05-12)

* Add missing export - tools/templ.

## 0.3.0 (2021-05-10)

* Support a custom rendering method if no template for the custom element was provided.

## 0.2.0 (2021-05-09)

* Recognise custom elements created with the declarative Shadow DOM.

## 0.1.0 (2021-05-03)

* Remove automatic re-rendering on a property change.
* Remove the `render` class method and asynchronous rendering.
* Remove the `empty` and `render` helpers.
* Add `elem` and `event` decorators.
* Add `templ` - a function memoizing creation of `HTMLTemplateELement`.
* Add plugins for `eslint` and `rollup` to transform `html` files as functions returning `HTMLTemplateElement`.

## 0.0.1 (2021-04-05)

Initial release.
