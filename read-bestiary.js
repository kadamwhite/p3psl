/**
 * Read the data from the compressed bestiary.
 */
const { bestiary, skills, blockNames } = require( './data.json' );

const { expandObj, elementsArrayToList } = require( './mappings' );

const reassembleEntry = compressedEntry => {
  const entry = expandObj( compressedEntry );
  return {
    ...entry,
    weaknesses: elementsArrayToList( entry.weaknesses ),
    skills: entry.skills.map( id => skills[ id ] ),
    block: blockNames[ entry.block ],
  };
};


// Asynchronously reassemble entries, using setTimeout and promises to avoid
// locking the UI thread with this seriously complex data processing :)
const entriesPromise = bestiary.reduce(
  ( eventuallyCollection, compressedEntry ) => new Promise( resolve => {
    eventuallyCollection.then( collection => {
      setTimeout( () => {
        const entry = reassembleEntry( compressedEntry );
        resolve( collection.concat( entry ) );
      } );
    } );
  } ),
  Promise.resolve( [] )
);

console.reset = function () {
  return process.stdout.write('\033c');
};

let idx = 0;
const str = '-\\|/';
const spinner = () => {
  idx++;
  if ( idx === str.length ) {
    idx = 0;
  }
  return str[idx];
};
console.spinner = function () {
  return console.log( spinner() );
}
const interval = setInterval( () => {
  console.reset();
  console.spinner();
} );

entriesPromise.then( results => {
  clearInterval( interval );
  console.log( results[5] );
} );
