import PropTypes from 'prop-types';

export const renderable = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.arrayOf( PropTypes.node ),
]);

export const shadow = PropTypes.shape({
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  lvl: PropTypes.number.isRequired,
  hp: PropTypes.number.isRequired,
  sp: PropTypes.number.isRequired,
  weaknesses: PropTypes.arrayOf(PropTypes.string).isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  location: PropTypes.string.isRequired,
  block: PropTypes.string.isRequired,
});
