import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ( { color = 'pink' } ) => (
  <div className={ `spinner ${ color }` }>
    <div className="card" />
  </div>
);

Card.propTypes = {
  color: PropTypes.oneOf([ 'pink', 'blue' ]),
};

export default Card;
