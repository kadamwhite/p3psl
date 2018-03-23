import { parse } from './data';

export const getData = () => parse();

export const getShadows = () => getData()
  .then( data => data.shadows );

export const getShadow = slug => getShadows()
  .then( shadows => shadows.find( shadow => shadow.slug === slug ) );

export const getShadowsForBlock = block => getShadows()
  .then( shadows => shadows.filter( shadow => shadow.block === block ) );

export const getBlocks = () => parse().then( data => data.blockNames );
