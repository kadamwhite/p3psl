/**
 * @param {String[]} props The list of props to make a checker method for.
 * @return {Function} A method to compare two objects for changes
 */
export default props => {
  /**
   * Check two objects for property equivalence
   *
   * @param {Object} obj The old state of the object
   * @param {Object} newObj The new state of the object
   * @return {Boolean} Whether the objects' properties differ
   */
  return (obj, newObj) => props
    .reduce((objectHasChanged, prop) => (
      objectHasChanged ? true : obj[prop] || newObj[prop]
    ), false);
};
