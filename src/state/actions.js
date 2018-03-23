import { getData } from '../lib/api';

export const LOAD_DATA = 'LOAD_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const loadData = () => (dispatch) => {
  dispatch({ type: LOAD_DATA });
  setTimeout(
    () => getData()
      .then(data => dispatch({
        type: RECEIVE_DATA,
        payload: data,
      }))
      .catch(err => console.error(err)),
    1000
  );
};

/**
 * Utility method to create an action creator for a specified type.
 * @param {String} type A Redux action type string.
 */
const actionCreator = ( type ) => ( payload ) => ({ type, payload });

export const SWITCH_COLORSCHEME = 'SWITCH_COLORSCHEME';
export const switchColor = actionCreator(SWITCH_COLORSCHEME);

export const COLLAPSE_HEADER = 'COLLAPSE_HEADER';
export const collapseHeader = actionCreator(COLLAPSE_HEADER);

export const EXPAND_HEADER = 'EXPAND_HEADER';
export const expandHeader = actionCreator(EXPAND_HEADER);
