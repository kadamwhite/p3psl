/**
 * Read and expand the data from the compressed bestiary.
 */
import slugify from './slugify';
import { weaknessesList } from './weaknesses';
import { expandObj } from './data-compression';

const {
  bestiary,
  skills,
  blockNames,
} = require( '../data/data.json' );


/**
 * Expand a compressed data object.
 *
 * @param {Object} compressedEntry A manually-compressed data object.
 * @return {Object} A re-hydrated shadow bestiary data object.
 */
const reassembleEntry = compressedEntry => {
  const entry = expandObj( compressedEntry );
  return {
    ...entry,
    slug: slugify( entry.name ),
    weaknesses: weaknessesList( entry.weaknesses ),
    skills: entry.skills.map( id => skills[ id ] ),
    block: blockNames[ entry.block ],
  };
};

// Asynchronously reassemble entries, using setTimeout and promises to avoid
// locking the UI thread with this _seriously_ complex data processing :)
const processBestiary = bestiary.reduce(
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

/**
 * Return the full, expanded data objects.
 * @async
 */
export const parse = () => processBestiary.then( shadows => ( {
  shadows,
  skills,
  blockNames,
} ) );
