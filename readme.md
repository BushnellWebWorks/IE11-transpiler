# IE11 Transpiler

Quick webpack widget that watches & transpiles ES6+ to IE11 compatible JavaScript.

### Description

It's 2019, and somehow IE11 is still alive! If your project needs to reach the widest possible audience, including your grandma, then you'll need this tool or something like it.

Go ahead and write your modern JS, and name your script files so they end in `.es6.js`. IE11 Transpiler will maintain a doppelganger of the same name, ending in `.ie-compat.js`.

A few considerations:

+ **Important:** Transpiled scripts don't run in the global scope, so variables considered "global" must be referenced as properties of _window_. For example:

`let foo = foo || {}` // _outside references to `foo` won't work_.

`let foo = window.foo = foo || {}` // _adds `foo` to the "global" scope_.

+ **Note:** Unfortunately this watcher doesn't recognize newly-added files. After creating a new .es6.js file, cancel and start again.

+ **Also note:** `window.fetch` isn't a babel feature (it's a browser spec, not a JS function), so it must be polyfilled, e.g.:
<pre>
    if ( 'undefined' == typeof window.fetch ) {
      let wf = document.createElement('script');
      wf.src = 'path/to/hosted/fetch.umd.js';
      document.body.appendChild( wf );
    }
</pre>

+ A quick & dirty way to check for IE11 is to check the user agent (navigator.userAgent) for instances of 'trident' or 'msie'. Some ES6-compliant browsers may also match, but the worst case is they'll use the transpiled script versions instead of the modern ones. 