const { setDOMFeatures } = require('@prantlf/dom-lite/global')

setDOMFeatures({ constructibleStylesheets: !process.env.NO_CONSTRUCTIBLE_STYLESHEETS })
