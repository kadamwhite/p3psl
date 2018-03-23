import { combineReducers } from 'redux';
import collapsed from './collapsed';
import shadows from './shadows';
import blocks from './blocks';

export default combineReducers({
  collapsed,
  shadows,
  blocks,
});
