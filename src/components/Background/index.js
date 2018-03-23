import React from 'react';
import PropTypes from 'prop-types';
import './Background.css';

const Background = ({ primary, secondary }) => (
  <svg
    className="background"
    style={{ background: secondary }}
    viewBox="0 0 400 600"
    aria-hidden="true"
  >
    <ellipse
      fill={primary}
      cx="0"
      cy="750"
      rx="370"
      ry="1000"
    />
  </svg>
);

Background.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
};

export default Background;
