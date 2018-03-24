import { SEARCH } from '../actions';

const defaultState = {
  search: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        search: action.payload,
      }
    default:
      return state;
  }
}

export const selectSearchTerm = (state) => state.filters.search;
