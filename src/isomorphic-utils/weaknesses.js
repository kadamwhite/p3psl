import capitalize from './capitalize';

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

// The first two letters let us know what type of weakness
// we are dealing with.
const getGroup = (weakness) => weakness.substring(0, 2);

export const groupWeaknesses = (weaknesses) => {
  const groups = weaknesses.reduce((groups, weakness) => {
    const group = getGroup(weakness);
    return {
      ...groups,
    [ group ]: groups[ group ] ?
      `${ groups[ group ]}, ${ weakness.replace(/^.*\s/, '') }` :
      weakness
    };
  }, {});

  return Object.values(groups);
};

/** Assume weaknesses is a string array ordered as elementsOrder. */
export const weaknessesArray = weaknesses => weaknesses.map( weaknessId ).join( '' );

/** Take an elements string and break it into human-readable groups. */
export const weaknessesList = elements => elements.split( '' ).reduce(
  ( list, id, idx ) => +id ?
    list.concat( `${
      // Reaction to Element
      weaknesses[ id ]
    } ${
      // Name of Element
      capitalize( elementsOrder[idx] )
    }` ) :
    list,
  []
).sort();
