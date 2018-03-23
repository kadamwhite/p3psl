import React from 'react';
import PropTypes from 'prop-types';
import './Background.css';

const Card = ( { color = 'pink' } ) => (
  <svg
    className={ `bg ${ color }` }
    viewBox="0 0 400 600"
    aria-hidden="true"
  >
    <ellipse
      cx="0"
      cy="750"
      rx="370"
      ry="1000"
    />
  </svg>
);

Card.propTypes = {
  color: PropTypes.oneOf([ 'pink', 'blue' ]),
};

export default Card;
