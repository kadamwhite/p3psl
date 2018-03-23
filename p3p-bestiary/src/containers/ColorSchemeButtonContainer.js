import { connect } from 'react-redux';
import {
  BlueColorSchemeButton,
  PinkColorSchemeButton,
} from '../components/ColorSchemeButton';

const mapDispatchToProps = ( dispatch ) => ({
  onClick( color ) {
    dispatch({
      type: 'SWITCH_COLORSCHEME',
      payload: color,
    });
  }
});

export const BlueColorSchemeButtonContainer = connect(null, mapDispatchToProps)(BlueColorSchemeButton);
export const PinkColorSchemeButtonContainer = connect(null, mapDispatchToProps)(PinkColorSchemeButton);
