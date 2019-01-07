export default str => str
  .toLowerCase()
  .trim()
  .split( /\s+/ )
  .map( word => `${ word[0].toUpperCase() }${ word.substring( 1 ) }` )
  .join( ' ' );
