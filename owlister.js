#!/usr/bin/env node
'use strict'

// IDEA: $ cli-help website directory.

const fs = require('fs'); // file system


// read tasks.owl, return error message or data string.
fs.readFile('tasks.owl', 'utf8', (err, data) => {
  err ? console.log('err: missing tasks.owl file') : true;

  data = data.replace(/ => /g, ' = concurrently ');
  data = data.replace(/\s\s+/g, ' ');

  // match all instances of "var varname = value"
  let variables = data.match(/var [\w-:]+ = [^;]+/g);
  // console.log(variables);
  
  let varsObject = {};
  
  variables.forEach( (variable) => {
    variable = variable.slice(4, variable.length)
      .split(' = ');
      varsObject[variable[0]] = variable[1];
  });
  
  let taskRequest = varsObject[process.argv[2]];
  // console.log(taskRequest);
  
  let whileCount = 0;

  // while an unprocessed variable is still present in the task
  // replace the variable with its appropriate value, and test again.
  while(taskRequest.match(/\([\w-:]+\)/g)) {
    
    // grab the variable name from within the parenthesis
    let theVar = taskRequest.slice(taskRequest.indexOf('(') + 1,
      taskRequest.indexOf(')'));

    // replace the (variable) instance with the associated value within
    // the varsObject object.
    taskRequest = taskRequest.replace(`(${theVar})`, varsObject[theVar]);

    // save us from any possible infinite loop.
    whileCount++;
    if(whileCount >= 50) {
      break;
    };
  } // while
  
  // console.log(taskRequest);

  const exec = require('child_process').exec;
  const child = exec(taskRequest, (error, stdout, stderr) => {
  	console.log(`stdout: ${stdout}`);
  	console.log(`stderr: ${stderr}`);
  	if (error !== null) {
  		console.log(`execution error: ${error}`);
  	};
  }); // exec()
}); // FS.readFile()
