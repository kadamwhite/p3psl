const { parse } = require( './original-attempt/src/lib/data' );

const [ , , ...argv ] = process.argv;

const args = argv.join().toLowerCase()
  .replace( /--(name|block),/g, '--$1=' )
  .split( ',' )
  .reduce( ( pairs, arg ) => {
    const key = arg.replace( /^--(name|block).*$/, '$1' );
    const val = arg.replace( /^--(name|block)=/, '' );
    return {
      ...pairs,
      [ key ]: val,
    };
  }, {} );

console.log( args );

parse()
  .then( data => data.bestiary )
  .then( shadows => shadows.filter( shadow => {
    const { name, block } = args;
    if ( name && shadow.name.toLowerCase().indexOf( name ) < 0 ) {
      return false;
    }
    if ( block && shadow.block.toLowerCase().indexOf( block ) < 0 ) {
      return false;
    }
    return true;
  } ) )
  .then( shadows => console.log( shadows ) );
