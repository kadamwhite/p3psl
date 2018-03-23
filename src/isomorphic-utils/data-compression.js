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

const compressObj = obj => Object.keys( obj ).reduce( ( compressedObj, key ) => ( {
  ...compressedObj,
  [ shortKeys[ key ] ]: obj[ key ],
} ), {} );

const expandObj = obj => Object.keys( obj ).reduce( ( expandedObj, key ) => ( {
  ...expandedObj,
  [ longKeys[ key ] ]: obj[ key ],
} ), {} );

module.exports = {
  compressObj,
  expandObj,
};
