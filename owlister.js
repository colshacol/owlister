#!/usr/bin/env node
'use strict'

const fs = require('fs'); // file system
const task = process.argv[2]; // task name
const os = process.platform; // operating system

// read tasks.owl, return error msg or data string
fs.readFile('tasks.owl', 'utf8', (err, data) => {
  err ? console.log('invalid file') : true;

  // get vars and values from var block
  const vars = data.substr(
    data.indexOf('vars ((') + 'vars (('.length,
    data.indexOf('))')
  ).split(' = ');

  let varsLen = vars.length;

  // replace (varName) instances with var values
  for(let i = 0; i < varsLen; i += 2) {
    let  thisKey = `(${vars[i]})`,
         thisVal = vars[i + 1];
    data.replace(thisKey, thisVal);
  }



}) // FS.readFile()

// const exec = require('child_process').exec;
// const child = exec(command, (error, stdout, stderr) => {
// 	console.log(`stdout: ${stdout}`);
// 	console.log(`stderr: ${stderr}`);
// 	if (error !== null) {
// 		console.log(`execution error: ${error}`);
// 	}
// }); // exec()
