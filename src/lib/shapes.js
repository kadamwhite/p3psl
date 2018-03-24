import PropTypes from 'prop-types';

export const renderable = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.arrayOf( PropTypes.node ),
]);

export const shadow = PropTypes.shape({
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  lvl: PropTypes.number,
  hp: PropTypes.number,
  sp: PropTypes.number,
  weaknesses: PropTypes.arrayOf(PropTypes.string).isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  location: PropTypes.string,
  block: PropTypes.string.isRequired,
});
