# (( '^' )) Owlister v.0.0.3

## Owlister provides a prettier way to manage npm scripts.
Although the following code examples may look unrelated, they are astonishingly similar and only separated in formatting and a few functional features.

Here's the npm scripts way:
```json
"scripts": {
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

And here is the Owlister way:  

```
vars ((
  sassSrc = ./src/styles/*.sass
  sassDest = ./dist/styles/
  pugSrc = ./src/views/*.pug
  pugDest = ./dist/views/
  aPath = ./assets/scripts/main.js
  bPath = ./dist/main.js
))

scripts ((

  build:js = browserify (aPath) > (bPath)
  watch-js = watch '(^) (build:js)' assets/scripts
  watch:js = watch '(^) (build:js)' assets/scripts
  build:css = stylus (stylSrc) > dist/main.css
  watch:css = watch '(^) (build:css)' assets/styles/
  build:html = jade index.jade > dist/index.html
  watch:html = watch '(^) build:html' assets/html

  build =
    (^) (build:js)
    && (^) (build:css)
    && (^) (build:html)

  build:watch =
    parallelshell
      '(^) watch:js'
      '(^) watch:css'
      '(^) watch:html'
))
```

## Format how you like.
There is no restriction on how you organize your Owlister scripts. You can have a huge script all on one line or split into 97 lines with one word on each.

## Variable Support
Using variables in npm gets to be very ugly and verbose. Variables in Owlister are simple and attractive. After a `variable` is set, calling that variable in your script is as easy as `(variable)`.

npm scripts allow you to refer to other scripts by their name, kind of like variables. In Owlister, seeing as though there are no actual npm scripts living inside the package.json file, we had to find another way to support this for the user. Our solution was to make task blocks into variables, as well.

Whereas npm's syntax would look like `watch 'npm run build:html'`, Owlister's syntax hardly varies: `watch 'npm run (build:html)'`. Just like a variable.

## The Owl Token
I am not a big fan of keystrokes. They're noisy and require effort. The Owl Token is meant to reduce noise and effort by being a phantom variable that holds the value of `npm run`. Anywhere in your Owlister commands that you use the Owl Token `(^)`, it will be translated to `npm run`.

---
#### TODO
- Function: Handle '(task:name)' as variable and insert task block contents as variable value.
- Function: Send command to processing with child.process.exec()
- Integrate `owl cli-help <cli tool>` to assist users in creating scripts with various CLI tools.
- Test broad range of possible commands.
