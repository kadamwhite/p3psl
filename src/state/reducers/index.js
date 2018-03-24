import { combineReducers } from 'redux';
import collapsed from './collapsed';
import color from './color';
import filters from './filters';
import shadows from './shadows';
import blocks from './blocks';

export default combineReducers({
  collapsed,
  color,
  filters,
  shadows,
  blocks,
});
