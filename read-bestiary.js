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

console.log( bestiary.map( reassembleEntry ) );
