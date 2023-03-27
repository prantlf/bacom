# Changes

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
