import React from 'react';
import PropTypes from 'prop-types';
import ScreenReaderText from '../ScreenReaderText';
import maleProtagonistPortrait from './male-mc-portrait-icon.png';
import femaleProtagonistPortrait from './female-mc-portrait-icon.png';
import './ColorSchemeButton.css';

export const ColorSchemeButton = ({ alt, color, image, onClick }) => (
  <button className="select-color-scheme" onClick={ onClick }>
    <ScreenReaderText>
      Change to the { color } colorscheme
    </ScreenReaderText>
    <img src={ image } alt={ alt } />
  </button>
);

ColorSchemeButton.propTypes = {
  alt: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export const BlueColorSchemeButton = ({ onClick }) => ColorSchemeButton({
  alt: 'Portrait of Persona 3 male protagonist',
  color: 'blue',
  image: maleProtagonistPortrait,
  onClick: () => onClick('blue'),
});

export const PinkColorSchemeButton = ({ onClick }) => ColorSchemeButton({
  alt: 'Portrait of Persona 3 female protagonist',
  color: 'blue',
  image: femaleProtagonistPortrait,
  onClick: () => onClick('pink'),
});
