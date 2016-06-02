#!/usr/bin/env node
'use strict'

// IDEA: Store scriptsObject in global Owlister directory
// along with copy of most previous tasks.owl file.
// Compare files. If no diff is present, use currently
// stored scriptsObject instead of re-parsing.

// IDEA: $ owl cli-help <cli name> will give the user
// real world examples of how to write CLI commands for
// the specified cli tool.

const fs = require('fs'); // file system
const task = process.argv[2]; // task name
const os = process.platform; // operating system

// read tasks.owl, return error msg or data string
fs.readFile('tasks.owl', 'utf8', (err, data) => {
  err ? console.log('err: invalid file') : true;

  data = data.replace(/\(\^\)/gim, 'npm run');

  // get vars and values from var block
  const vars = data.slice( // TODO: research slice/substr
    data.indexOf('vars ((') + 'vars (('.length,
    data.indexOf('))'))
    .replace(/\n|=|;/gm, '')
    .split(/\s/g)
    .filter(Boolean);

  // console.log(vars);
  let varsLen = vars.length;

  // replace (varName) instances with var values
  for(let i = 0; i < varsLen; i += 2) {
    let  thisKey = `(${vars[i]})`,
         thisVal = vars[i + 1];
    data = data.replace(thisKey, thisVal);
  };


  // ==================================================
  // ==================================================

  // store task blocks as variables
  let scriptsObject = (() => {
    let scriptsBlock = data.slice(
      data.indexOf('scripts ((') + 'scripts (('.length,
      data.lastIndexOf('))'))
      .trim()
      .replace(/[\s]{2,}|[\n]/gm, ' ')
      .split(/;|[\s=\s]{2,}/g)
      .filter(Boolean);

    let obj = {};
    scriptsBlock.forEach((piece, i) => {
      if(i % 2 == 0 || i == 0) {
        obj[piece.trim()] = scriptsBlock[i + 1];
      };
    })
    return obj;
  })();

  let thisTask = scriptsObject[task];

  let whileCount = 0

  while(thisTask.match(/\([\w]+\)/g)) {
    let theTaskVar = thisTask.slice(thisTask.indexOf('(') + 1,
      thisTask.indexOf(')'));

    thisTask = thisTask.replace(`(${theTaskVar})`, scriptsObject[theTaskVar]);

    if(whileCount >= 50) {
      break;
    };
  } // while

  console.log(thisTask);

  const exec = require('child_process').exec;
  const child = exec(thisTask, (error, stdout, stderr) => {
  	console.log(`stdout: ${stdout}`);
  	console.log(`stderr: ${stderr}`);
  	if (error !== null) {
  		console.log(`execution error: ${error}`);
  	}
  }); // exec()
}) // FS.readFile()
