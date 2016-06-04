# (( '^' )) Owlister v.1.0.0

`$ npm install -g owlister` _Instructions for use at bottom of readme._

## Owlister provides a prettier way to manage terminal commands and Node.js tasks.

```
// root/tasks.owl

var stylus-in = ./styl;
var stylus-out = ./css;
var pug-in = ./index.pug;
var pug-out = ./index.html;
var babel-in = ./babel;
var babel-out = ./js;

var watch-stylus = stylus -w (stylus-in) -o (stylus-out);
var live-server:stylus-watch => '(watch-stylus)' 'live-server';
var watch-pug = pug -w (pug-in) > (pug-out);
var watch-babel = babel (babel-in) -w --out-dir (babel-out);

var build => '(watch-stylus)'
             '(watch-pug)'
             '(watch-babel)'
             'live-server';


```

## Format how you like.
There is no restriction on how you organize your Owlister scripts. You can have
 a huge script all on one line or split into 97 lines with one word on each.
  The rules for defining tasks are as follows:
  
- Begin your task declaration with the `var` keyword.
- Use only alphanumerical characters and `:` or `-` in your tasknames.
- End each task, *not each line*, with a semicolon.
- After declaring a task, refer to it using its name in parenthesis. `(task-name)`
- For concurrent tasks (multiple commands at once), use the fat arrow. `=>`

## Variable Support
Variables in Owlister are simple and attractive. After a `variable` is set,
 calling that variable in another task is as easy as `(variable)`.
 
## Concurrent Tasks
When declaring a task that performs multiple tasks at the same time, use the fat
arrow `=>` instead of the standard equal sign `=`. Owlister has but one single
dependency, and that is Concurrently. The fat arrow signifies that Concurrently
is needed for this task and that the separated commands inside this task should
be run side by side. *Be sure to encompass each individual command in quotes if
using concurrency.*

`var my-task:Rocks1 => 'task one' 'task two' 'task three';`

# How to use Owlister
1. `$ npm install -g owlister`
2. Create a tasks.owl file in your root directory.
3. Create your tasks in your tasks.owl file.
4. `$ owl taskName`


---
#### TODO
- Integrate `owl cli-help <cli tool>` to assist users in creating scripts with various CLI tools.
