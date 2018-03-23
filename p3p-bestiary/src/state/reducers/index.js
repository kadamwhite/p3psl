import { combineReducers } from 'redux';
import collapsed from './collapsed';
import color from './color';
import shadows from './shadows';
import blocks from './blocks';

export default combineReducers({
  collapsed,
  color,
  shadows,
  blocks,
});
