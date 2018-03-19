/**
 * Parse data from gamefaqs to generate monster list.
 *
 * Bestiary excerpted from Jarrod Garripoli's Persona 3 FES guide:
 * https://gamefaqs.gamespot.com/ps2/937269-shin-megami-tensei-persona-3-fes/faqs/52999
 */
const fs = require( 'fs' );
const resolve = require( 'path' ).resolve;

const {
  capitalize,
  weaknessId,
  elementsArrayToList,
  elementsObjectToArray,
  compressObj,
  expandObj,
  createSkillMethods,
  createBlockMethods,
} = require( './mappings' );

const SECTION_HEADING_RE = /\s+\/=+\\\n\s+\(\s(.*?)\s\)\s+\(Q\d+\)\n\s+\\=+\//;
const ENTRY_NAME_RE = /^\.=+\.\n\|\s+(.*?)\s+\|\n/;
const ENTRY_METADATA_RE = /\n\|\s+ARCANA\s+\|\s+LVL\s+\|\s+HP\s+\|\s+SP\s+\|\s+LOCATION\s+\|\n[|-]+\n\|\s([\w\s]+)\s\|\s([\s\d]+)\s\|\s([\s\d]+)\s\|\s([\s\d]+)\s\|\s([\w\s\d-]+?)\s\|\n/i;
const ENTRY_WEAKNESS_RE = /\|\s+SLASH\s+\|\s+STRKE\s+\|\s+PIRCE\s+\|\s+FIRE\s+\|\s+ICE\s+\|\s+ELEC\s+\|\s+WIND\s+\|\s+LIGHT\s+\|\s+DARK\s+\|\n[|-]+\n\|\s([\s\w]+)\s\|\s([\s\w]+)\s\|\s([\s\w]+)\s\|\s([\s\w]+)\s\|\s([\s\w]+)\s\|\s([\s\w]+)\s\|\s([\s\w]+)\s\|\s([\s\w]+)\s\|\s([\s\w]+)\s\|/
const ENTRY_SKILLS_RE = /\|\s-\s([^|]+)\|/g;

// UTILITY FUNCTIONS
// ============================================================================

// Sanity-check method to validate the possibility space of weakness descriptors.
// Could be run on an earlier incarnation of `blocks`;
// Results in [ '', 'Wk', 'Str', 'Null', 'Nul', 'Drn', 'Rpl' ]
// const buildElementalWeaknessEnum = blocks => Object.keys( blocks.reduce(
//   ( list, block ) => block.reduce(
//     ( list, entry ) => Object.keys( entry.weaknesses ).reduce(
//       ( list, key ) => ( {
//         ...list,
//         [ entry.weaknesses[ key ] ]: entry.weaknesses[ key ]
//       } ),
//       list
//     ),
//     list
//   ),
//   {}
// ) );


/**
 * Convert a RegExp match result into a predictable, trimmed array.
 *
 * @param {null|Array} match
 */
const trimAndCleanMatch = match => match && match.map( capture => {
  const trimmed = capture.trim();
  return /^\d+$/.test( trimmed ) ? +trimmed : trimmed;
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
    weaknesses: {
      slash: weaknessId( slash ),
      strike: weaknessId( strike ),
      pierce: weaknessId( pierce ),
      fire: weaknessId( fire ),
      ice: weaknessId( ice ),
      electric: weaknessId( electric ),
      wind: weaknessId( wind ),
      light: weaknessId( light ),
      dark: weaknessId( dark ),
    },
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


// DATA PROCESSING PIPELINE
// ============================================================================

const input = fs.readFileSync( resolve( __dirname, 'bestiary.txt' ) );

const entries = input.toString().split( /\n{2,}/ )
  .filter( entry => ! /^\s*$/.test( entry ) );

const blocks = buildBlocks( entries );

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
const { skillId, skillName } = createSkillMethods( skills );

const blockNames = blocks.map( block => capitalize( block.name ) );
const { blockId, blockName } = createBlockMethods( blockNames );

const bestiary = blocks.reduce(
  ( bestiary, block ) => block.reduce(
    ( bestiary, entry ) => bestiary.concat( compressObj( {
      ...entry,
      weaknesses: elementsObjectToArray( entry.weaknesses ),
      skills: entry.skills.map( skillId ),
      block: blockId( entry.block ),
    } ) ),
    bestiary
  ),
  []
);

// const reassembleEntry = compressedEntry => {
//   const entry = expandObj( compressedEntry );
//   return {
//     ...entry,
//     weaknesses: elementsArrayToList( entry.weaknesses ),
//     skills: entry.skills.map( skillName ),
//     block: blockName( entry.block ),
//   };
// };

fs.writeFileSync( resolve( __dirname, 'data.json' ), JSON.stringify( {
  bestiary,
  blockNames,
  skills,
} ) );
