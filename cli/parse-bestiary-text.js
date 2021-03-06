/**
 * Parse data from gamefaqs to generate monster list.
 *
 * Bestiary excerpted from Jarrod Garripoli's Persona 3 FES guide:
 * https://gamefaqs.gamespot.com/ps2/937269-shin-megami-tensei-persona-3-fes/faqs/52999
 */
process.on( 'unhandledRejection', err => {
  throw err;
} );

const fs = require( 'fs' );
const resolve = require( 'path' ).resolve;

const capitalize = require( '../src/isomorphic-utils/capitalize' );
const { weaknessesArray } = require( '../src/isomorphic-utils/weaknesses' );
const { compressObj } = require( '../src/isomorphic-utils/data-compression' );

// PARSING LOGIC
// ============================================================================

const SECTION_HEADING_RE = /\s+\/=+\\\n\s+\(\s(.*?)\s\)\s+\(Q\d+\)\n\s+\\=+\//;
const ENTRY_NAME_RE = /^\.=+\.\n\|\s+(.*?)\s+\|\n/;
const ENTRY_METADATA_RE = /\|\s+ARCANA\s+\|\s+LVL\s+\|\s+HP\s+\|\s+SP\s+\|\s+LOCATION\s+\|\n[|-]+\n\|\s([\w\s]+)\s\|\s([\s\d]+)\s\|\s([\s\d,]+)\s\|\s([\s\d]+)\s\|(\s([\w\s\d-]+?)\s\|)?/i;
const ENTRY_WEAKNESS_RE = /\|\s+SLASH\s+\|\s+STRKE\s+\|\s+PIRCE\s+\|\s+FIRE\s+\|\s+ICE\s+\|\s+ELEC\s+\|\s+WIND\s+\|\s+LIGHT\s+\|\s+DARK\s+\|\n[|-]+\n\|\s([\s\w]+)\s\|\s([\s\w]+)\s\|\s([\s\w]+)\s\|\s([\s\w]+)\s\|\s([\s\w]+)\s\|\s([\s\w]+)\s\|\s([\s\w]+)\s\|\s([\s\w]+)\s\|\s([\s\w]+)\s\|/
const ENTRY_SKILLS_RE = /\|\s-\s([^|]+)\|/g;

/**
 * Convert a RegExp match result into a predictable, trimmed array.
 *
 * @param {null|Array} match
 */
const trimAndCleanMatch = match => match && match.map( capture => {
  if (!capture) {
    return '';
  }
  const trimmed = capture.trim().replace(/\s\|\s*$/, '');
  return /^\d+(,\d+)?$/.test( trimmed ) ? +trimmed.replace(',', '') : trimmed;
} ) || [];

/**
 *
 * @param {String} str The bestiary entry
 */
const parseBestiaryEntry = ( str, block ) => {
  const [ , name ] = trimAndCleanMatch( str.match( ENTRY_NAME_RE ) );
  const [ , arcana, lvl, hp, sp, location ] = trimAndCleanMatch( str.match( ENTRY_METADATA_RE ) );
  const [ , slash, strike, pierce, fire, ice, electric, wind, light, dark ] = trimAndCleanMatch( str.match( ENTRY_WEAKNESS_RE ) );
  const skills = str.match( ENTRY_SKILLS_RE )
    .map( str => str
      .replace( /^\|\s+-\s+/, '' )
      .replace( /\s+\|$/, '' )
      .trim()
    );

  return {
    name: capitalize( name ),
    arcana,
    lvl,
    hp,
    sp,
    location,
    weaknesses: weaknessesArray( [
      slash,
      strike,
      pierce,
      fire,
      ice,
      electric,
      wind,
      light,
      dark,
    ] ),
    skills,
    block: capitalize( block ),
  };
};

/**
 * Reduce an array of strings into a nested array of monsters per block.
 *
 * @param {String[]} entries
 */
const buildBlocks = entries => entries.reduce( ( blocks, entry ) => {
  const sectionMatch = entry.match( SECTION_HEADING_RE );
  if ( ! sectionMatch ) {
    const latestBlock = blocks[ blocks.length - 1 ];
    latestBlock.push( parseBestiaryEntry( entry.trim(), latestBlock.name ) );
  } else {
    const blockName = sectionMatch[1].trim();
    const newBlock = [];
    newBlock.name = blockName;
    blocks.push( newBlock );
  }
  return blocks;
}, [] );


// READ & PARSE TEXT FILE
// ============================================================================

const input = fs.readFileSync( resolve( __dirname, 'bestiary.txt' ) );

const blocks = buildBlocks(
  input.toString().split( /\n{2,}/ ).filter( entry => ! /^\s*$/.test( entry ) )
);

// BUILD DICTIONARIES OF DATA WITHIN BLOCK LIST
// ============================================================================

const skills = Object.keys( blocks.reduce(
  ( skillList, block ) => block.reduce(
    ( skillList, entry ) => entry.skills.reduce(
      ( skillList, skill ) => ( {
        ...skillList,
        [skill]: skill,
      } ),
      skillList
    ),
    skillList
  ),
  []
) ).sort();
const skillIDsByName = skills.reduce(
  ( idsByName, skill, idx ) => ( {
    ...idsByName,
    [ skill ]: idx,
  } ),
  {}
);
const skillId = skill => skillIDsByName[ skill ];
// Retrieve through dictionary lookup:
// const skillName = id => skills[ id ];

const blockNames = blocks.map( block => capitalize( block.name ) );
const blockIDsByName = blockNames.reduce(
  ( idsByName, name, idx ) => ( {
    ...idsByName,
    [ name ]: idx,
  } ),
  {}
);
const blockId = name => blockIDsByName[ name ];
// Retrieve through dictionary lookup:
// const blockName = id => blockNames[ id ];

// CREATE LIST OF COMPRESSED BESTIARY ENTRIES
// ============================================================================

const bestiary = blocks.reduce(
  ( bestiary, block ) => block.reduce(
    ( bestiary, entry ) => bestiary.concat( compressObj( {
      ...entry,
      skills: entry.skills.map( skillId ),
      block: blockId( entry.block ),
    } ) ),
    bestiary
  ),
  []
);

// WRITE FILE
// ============================================================================

fs.writeFileSync( resolve( __dirname, '../src/data/data.json' ), JSON.stringify( {
  bestiary,
  blockNames,
  skills,
} ) );
