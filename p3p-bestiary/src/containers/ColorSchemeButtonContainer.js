import { connect } from 'react-redux';
import {
  BlueColorSchemeButton,
  PinkColorSchemeButton,
} from '../components/ColorSchemeButton';
import { switchColor } from '../state/actions';

const mapDispatchToProps = (dispatch) => ({
  onClick: (color) => dispatch(switchColor(color)),
});

export const BlueColorSchemeButtonContainer = connect(null, mapDispatchToProps)(BlueColorSchemeButton);
export const PinkColorSchemeButtonContainer = connect(null, mapDispatchToProps)(PinkColorSchemeButton);
