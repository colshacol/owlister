#!/usr/bin/env node
'use strict'

// TODO: Change path formatting to .path instead of [path]

// syncs are keywords that will indicate that the following
// task will be ran in sync with the previous.
let syncs = ['++', 'WHILE', 'while', 'AND', 'and', '&'];

// asyncs are keywords that will indicate that the following
// task will run after the previous has completed.
let asyncs = ['>>', 'THEN', 'then', 'NEXT', 'next', '&&'];

// refers are keywords that refer to a previous path. it and
// them refer to the most previous path whereas origin and origins
// refer to the first path and the first path per line, respectively.
let refers = ['it', 'them', 'origin', 'origins'];

// modules is an array of dependencies that the script may need
// access to.
let modules = [];

// ::::::::::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::

const FS = require('fs'); // FILESYSTEM

// argv = ['node', 'owl', task]
let task = process.argv[2];

// read tasks.owl
FS.readFile('tasks.owl', 'utf8', (error, data) => {
	error ? console.log('INVALID FILE') : true;

	// ................................................
	// Create array of requirements, store in modules[]
	modules = data.slice(0, data.indexOf(']'))
		.replace(/\[|\]|,/gmi, ' ') // replace '[', ']' and ',' with a space.
		.split(/\s/g) // then split the string at each space.
		.filter(Boolean); // lastly, remove empty array elements.
	// console.log(modules);

	// .............................................................
	// Locate the task definition. Extract each 'bit' into an array.
	let taskBits = (() => {
		let bits = data.toLowerCase()
			.slice(data.indexOf(`${task}:`) + `${task}:`.length, data.indexOf(
				`:${task}`) - 1)
			.split(/\s/g)
			.filter(Boolean);
		return bits;
	})(task, data); // close getTaskBits()
	// console.log(taskBits);

	// ..........................................................
	// Translate array, bit by bit, into command to be processed.
	let command = '';
	let paths = [];
	let origin = '';

	taskBits.forEach(bit => {
		// If bit is indicated to be a path...
		if (bit[0] == '[') {
			let thisPath = bit.slice(1, -1);
			if (origin.length <= 1) origin = thisPath;
			paths.push(thisPath);
			command += ` ${thisPath}`;
			return;

			// Or if bit is a CLI option...
		} else if (bit[0] == '-') {
			command += ` ${bit}`;
			return;

			// Or if bit is a declared dependency...
		} else if (modules.indexOf(bit) >= 0) {
			command += ` ${bit}`;
			// console.log(`${bit} is a required module.`);
			return;

			// Or if bit is an async keyword...
		} else if (asyncs.indexOf(bit) >= 0) {
			command += ` &&`;
			// console.log(`${bit} (async) converted to &&`);
			return;

			// Or if bit is a sync keyword...
		} else if (syncs.indexOf(bit) >= 0) {
			command += ` &`;
			// console.log(`${bit} (sync) converted to &`);
			return;

			// Or if bit is a reference keyword...
		} else if (refers.indexOf(bit) >= 0) {
			if (bit == 'it' || bit == 'them') {
				// console.log(`${bit} is a refernece to ${paths[paths.length-1]}`);
				command += ` ${paths[paths.length-1]}`;
				return;

			} else {
				// console.log(`${bit} is a refernece to ${origin}`);
				command += ` ${origin}`
				return;

			} // refers[] if/else
		} else if(bit[0] == '-') {
			command += ` ${bit}`;

		} else {
			// console.log(`'${bit}' is not legal. Ignored.`);
			return;
		}; // f/../else
	}); // forEach bit

	// console.log(command);
	const exec = require('child_process').exec;
	const child = exec(command, (error, stdout, stderr) => {
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
		if (error !== null) {
			console.log(`execution error: ${error}`);
		}
	}); // exec()
}); // readFile()
