import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Card = ( { color = 'pink' } ) => (
  <div className={ `card-container ${ color }` }>
    <div className="card" />
  </div>
);

Card.propTypes = {
  color: PropTypes.oneOf([ 'pink', 'blue' ]),
};

export default Card;
