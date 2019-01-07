export default str => str
  .trim()
  .toLowerCase()
  .split( /[\s\W_]+/ )
  .filter( Boolean )
  .join( '-' );
