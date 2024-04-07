# Changes

## [3.0.0](https://github.com/prantlf/bacom/compare/v2.2.0...v3.0.0) (2024-04-07)

### Features

* Reflect property to attribute only if enabled ([ced480e](https://github.com/prantlf/bacom/commit/ced480e3c87fd81f078dc0a87515068f7d7e09d5))

### BREAKING CHANGES

The default value of the `reflect` flag has changed to
`false`. Properties do not reflect their values to attributes
automatically. The default roles of attributes is to initialize
properties, not necessarily to always contain the same value. If you
need to always synchronize the value of a property and an attribute, set
the flag `reflect` to `true` explocitly in the property declaration.

## [2.2.0](https://github.com/prantlf/bacom/compare/v2.1.0...v2.2.0) (2024-04-07)

### Features

* Allow disabling reflection from property to attribute ([7552af6](https://github.com/prantlf/bacom/commit/7552af64869f8f9180afd0dde2a57c31ea0f400e))

## [2.1.0](https://github.com/prantlf/bacom/compare/v2.0.0...v2.1.0) (2024-04-07)

### Features

* Allow abstract custom elements without a tag name ([e3be144](https://github.com/prantlf/bacom/commit/e3be144bfe18bf781fa4a74abc34b9ce0a83b0da))

### Bug Fixes

* Fix reflecting property values from dasherized attributes to properties ([14306a5](https://github.com/prantlf/bacom/commit/14306a565f6239daeecfd787eadf4e44ca8aeccd))

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
