let ntm = {
 
  // ntm.cats() is used for concatenating multiple
  // files together. It will work to append one file
  // onto another, but it is suggested that ntm.pens()
  // is used for singular file appendatures.
 
  concats: ( pathsArray, outputPath ) => {
	let appendData = '';
 
	pathsArray.forEach(( file ) => {
  	FS.readFile( file, 'utf8', ( error, data ) => {
    	error ? console.log( `Error loading ${ file }.` ) : appendData += data;
  	}); // readFile()
	}); // forEach()
 
	FS.append( outputPath, appendData, ( error ) => {
  	error ? console.log( `Could not append to ${ outputPath }.` ) : false;
	}); // append()
  }, // cats()
 
 
  // ntm.pens() is used for appending a single file
  // onto another and does not offer a loop to support
  // multiple files. Use npm.cats() instead.
 
  pens: ( inputPath, outputPath ) => {
	FS.append( outputPath, inputPath, ( error ) => {
  	error ? console.log( `Could not append to ${ outputPath }.` ) : false;
	}); // append()
  } // pens()
} // ntm{}
 
 
/* | ntm rules:
 
	task-name:
  	First line of task declaration must
  	be the task name with no spaces and
  	followed by a colon.
	 
	module-name
 
*/
 
 
 
 
 
let showName = ( firstName, lastName ) => {
  let nameIntro = 'Your name is ';
  let makeFullName = ( ) => `${nameIntro} ${firstName} ${lastName}.`;
  return makeFullName( );
}
 
showName( "John", "Cougar" );
