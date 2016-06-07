# Pug (formerly Jade)

### Requires
- `npm i -g pug`
- `npm i -g pug-cli`

### Notes
- To watch a directory and output all files to another directory:
```
var pugIn = ./dir1/;
var pugOut = ./dir2/;

var watch:pug = pug -w (pugIn) -o (pugOut);
```

- To watch a file and output it to another directory:
```
var pugIn = ./dir1/file.pug;
var pugOut = ./dir2/;

var watch:pug = pug -w (pugIn) > (pugOut);


```
