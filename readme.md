This tool watches ES6+ javascript files in the SuiteBee plugins directory (platform/wp-content/plugins), and transpiles them to IE11 compatible files.

## Usage:
+ ES6 files must be named with extension '.es6.js'
+ Compatible files will be created/modified alongside the original, with extension '.ie-compat.js'
+ For example: assets/js/foo.es6.js gains a new file assets/js/foo.ie-compat.js
+ *Important:* Transpiled scripts don't run in the global scope. So variables considered "global" must be referenced as properties of _window_. For example:
`var foo = foo || {}` // _outside references to foo won't work_
`var foo = window.foo = foo || {}` // _adds foo to the "global" space_
+ *Note:* unfortunately, webpack --watch doesn't recognize newly-added files. After creating a new .es6.js file, cancel and start again.
+ *Also:* a dummy file named \_polyfill will appear in this directory, which can be ignored.
+ *Note:* window.fetch is not a babel feature (it's a browser spec, not a JS spec). So it must be polyfilled, e.g.:
`    if ( 'undefined' == typeof window.fetch ) {
      let wf = document.createElement('script');
      wf.src = 'https://d17vd6x9ly0b0q.cloudfront.net/assets/any/polyfills/fetch.umd.js';
      document.body.appendChild( wf );
    }
`

Uses webpack & babel. After installing modules (yarn preferred -- if npm then remove the yarn.lock file), type `yarn start` to begin watching.
