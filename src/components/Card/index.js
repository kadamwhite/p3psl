import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ color = 'pink' }) => (
  <div className="spinner">
    <div
      className="card"
      style={{ background: color }}
    />
  </div>
);

Card.propTypes = {
  color: PropTypes.string.isRequired,
};

export default Card;
