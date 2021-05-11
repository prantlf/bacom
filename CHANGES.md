# Changes

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
