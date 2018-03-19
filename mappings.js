// STRING UTILITIES
// ============================================================================

const capitalize = str => str
  .toLowerCase()
  .trim()
  .split( /\s+/ )
  .map( word => `${ word[0].toUpperCase() }${ word.substring( 1 ) }` )
  .join( ' ' );

// WEAKNESS ENUM
// ============================================================================

const weaknesses = {
  0: 'Normal',
  1: 'Weak to',
  2: 'Strong against',
  3: 'Nullifies',
  4: 'Absorbs',
  5: 'Repels',
};
const weaknessId = weakness => {
  switch ( weakness.toLowerCase() ) {
    case 'wk':
      return 1;
    case 'str':
      return 2;
    case 'null':
    case 'nul':
      return 3;
    case 'drn':
      return 4
    case 'rpl':
      return 5;
    default:
      return 0;
  }
}
const weaknessName = id => weaknesses[ id ];

// COMPRESSED JSON OBJECT KEYS
// ============================================================================

const shortKeys = {
  arcana: 'a',
  block: 'b',
  hp: 'h',
  location: 'lo',
  lvl: 'lv',
  name: 'n',
  skills: 'sk',
  sp: 'sp',
  weaknesses: 'w',
};
const longKeys = Object.keys( shortKeys ).reduce( ( memo, longKey ) => ( {
  ...memo,
  [ shortKeys[ longKey ] ]: longKey,
} ), {} );
const getShortKey = longKey => shortKeys[ longKey ];
const getLongKey = shortKey => longKeys[ shortKey ];

const compressObj = obj => Object.keys( obj ).reduce( ( compressedObj, key ) => ( {
  ...compressedObj,
  [ shortKeys[ key ] ]: obj[ key ],
} ), {} );

const expandObj = obj => Object.keys( obj ).reduce( ( expandedObj, key ) => ( {
  ...expandedObj,
  [ longKeys[ key ] ]: obj[ key ],
} ), {} );

// COMPRESS AND DECOMPRESS WEAKNESSES
// ============================================================================

const elementsOrder = [
  'slash',
  'strike',
  'pierce',
  'fire',
  'ice',
  'electric',
  'wind',
  'light',
  'dark',
];
const elementsObjectToArray = elements => elementsOrder.map( name => elements[ name ] ).join( '' );
// This would be the strict reverse of elementsObjectToArray -- it is unused.
// const elementsArrayToObject = elements => elements.split( '' ).reduce( ( memo, id, idx ) => ( {
//   ...memo,
//   [ elementsOrder[ idx ] ]: weaknessName( id ),
// } ), {} );
// The added ternary around the reduce() function's return omits the "normal" elements.
const elementsArrayToList = elements => elements.split( '' ).reduce(
  ( list, id, idx ) => +id ?
    list.concat( `${ weaknessName( id ) } ${ capitalize( elementsOrder[idx] ) }` ) :
    list,
  []
).sort();

module.exports = {
  capitalize,
  weaknessId,
  weaknessName,
  elementsObjectToArray,
  elementsArrayToList,
  compressObj,
  expandObj,
};
