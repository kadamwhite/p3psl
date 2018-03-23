import React from 'react';
import './ScreenReaderText.css';

const ScreenReaderText = ({ children }) => (
  <span className="screen-reader-text">
    { children }
  </span>
);

export default ScreenReaderText;
