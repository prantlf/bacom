# [1.0.0](https://github.com/prantlf/bacom/compare/v0.6.0...v1.0.0) (2023-03-27)

### Bug Fixes

* Support ES and CJS build scripts properly ([693e2c3](https://github.com/prantlf/bacom/commit/693e2c39137f5c3a938da0c053106c393d426fd7))
* Upgrade dependencies ([c432a3a](https://github.com/prantlf/bacom/commit/c432a3a86c9a47c464d6aa75237ad0ebf4e1b892))

### BREAKING CHANGES

* The minimum supported version of Node.js increased from 12 to 16.14.
* CJS variants of build plugins don't have the extension '.js' any more. Require them with no extension, just like you import them in ES scripts.

## 0.6.0

* Add webpack loaders to support webpack users.

## 0.5.1

* Fix stack trace of source maps for stylesheets and templates.

## 0.5.0

* Add plugins for LESS and SASS sources.
* Fix source maps of stylesheets and templates compiled with esbuild.
* Improve performance of counting lines in source stylesheets and templates.
* Improve performance of minifying by using just the best minifier.

## 0.4.0

* Minify CSS and HTML bundled by esbuild and rollup plugins.
* Cache once minified files, in case the bundler asks for the same file again.
* Make reflection properties configurable.

## 0.3.1

* Add missing export - tools/templ.

## 0.3.0

* Support a custom rendering method if no template for the custom element was provided.

## 0.2.0

* Recognise custom elements created with the declarative Shadow DOM.

## 0.1.0

* Remove automatic re-rendering on a property change.
* Remove the `render` class method and asynchronous rendering.
* Remove the `empty` and `render` helpers.
* Add `elem` and `event` decorators.
* Add `templ` - a function memoizing creation of `HTMLTemplateELement`.
* Add plugins for `eslint` and `rollup` to transform `html` files as functions returning `HTMLTemplateElement`.

## 0.0.1

Initial release.
