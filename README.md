# (( '^' )) Owlister v.1.0.0

## Owlister provides a prettier way to manage terminal commands and npm scripts.
Although the following code examples may look unrelated, they are astonishingly similar and only separated in formatting and a few functional features.

Here's an example of the mess known as npm scripts:
```json
"scripts": {
  "ls": "live-server",
  "build:js": "browserify assets/scripts/main.js > dist/main.js",
  "watch:js": "watch 'npm run build:js' assets/scripts/",
  "build:css": "stylus assets/styles/main.styl > dist/main.css",
  "watch:css": "watch 'npm run build:css' assets/styles/",
  "build:html": "jade index.jade > dist/index.html",
  "watch:html": "watch 'npm run build:html' assets/html",
  "build": "npm run build:js && npm run build:css && npm run build:html",
  "build:watch": "parallelshell 'npm run watch:js' 'npm run watch:css' 'npm run watch:html'",
}
```
_Let's not even discuss how npm handles variables..._

And here is a sample tasks.owl file:  

```
vars ((
  aPath = ./assets/scripts/main.js;
  bPath = ./dist/main.js;
  stylSrc = ./path/to/*.styl;
  stylIn = ./styl;
  stylOut = ./css/;
  ls = live-server
))

scripts ((

  buildJs = browserify (aPath) > (bPath);
  watchJs = watch '(^) (buildJs)' assets/scripts;
  buildCss = stylus (stylSrc) > dist/main.css;
  watchCss = watch '(^) (buildCss)' assets/styles/;
  buildHtml = jade index.jade > dist/index.html;
  watchHtml = watch '(^) (buildHtml)' (buildJs);

  build =
    (^) (buildJs)
    && (^) (buildCss)
    && (^) (buildHtml);

  buildWatch =
    parallelshell '(^) (watchJs)'
                  '(^) (watchCss)'
                  '(^) (watchHtml)';

  watchStyl = stylus --watch (stylIn) --out (stylOut);
  serveStylus = parallelshell '(watchStyl)' '(ls)';
  nodeSass = node-sass ./sass/ -o ./css/

))

```

## Format how you like.
There is no restriction on how you organize your Owlister scripts. You can have a huge script all on one line or split into 97 lines with one word on each. The only rules are to initialize task blocks with "TASKNAME = " and close them with semicolons.

## Variable Support
Using variables in npm gets to be very ugly and verbose. Variables in Owlister are simple and attractive. After a `variable` is set, calling that variable in your script is as easy as `(variable)`.

npm scripts allow you to refer to other scripts by their name, kind of like variables. In Owlister, seeing as though there are no actual npm scripts living inside the package.json file, I had to find another way to support this for the user. My solution was to make task blocks into variables, as well.

Whereas npm's syntax would look like `watch 'npm run build:html'`, Owlister's syntax hardly varies: `watch 'npm run (build:html)'`. Just like a variable.

## The Owl Token
I am not a big fan of keystrokes. They're noisy and require effort. The Owl Token is meant to reduce noise and effort by existing as a phantom variable that holds the value of `npm run`. Anywhere in your Owlister commands that you use the Owl Token `(^)`, it will be translated to `npm run`.

# Not only npm scripts...
Owlister only runs the scripts that you write. `npm run` is not implicit. Therefore; if you choose not to use `npm run` or the `(^)` owl token, you can simply write and store terminal commands that have nothing to do with npm.

---
#### TODO
- Integrate `owl cli-help <cli tool>` to assist users in creating scripts with various CLI tools.
