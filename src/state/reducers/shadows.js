import { createSelector } from 'reselect';
import { RECEIVE_DATA } from '../actions';
import { selectSearchTerm } from './filters';

const defaultState = {
  bySlug: {},
  slugs: [],
};

const combineShadows = (shadow1, shadow2) => ({
  ...shadow1,
  // Even if shadow1 is defined, its location may be ''
  location: shadow1.location ?
    [shadow1.location, shadow2.location].join(', ') :
    shadow2.location,
});

export default ( state = defaultState, action ) => {
  switch (action.type) {
    case RECEIVE_DATA:
      return action.payload.shadows.reduce((newState, shadow) => {
        const { slug } = shadow;
        const existingShadow = newState.bySlug[ slug ];
        return {
          bySlug: {
            ...newState.bySlug,
            [ slug ]: existingShadow ?
              // We may have multiple entries for shadows if they
              // occur in two separate blocks. They should have the
              // same stats in both, so we merge the entries and
              // combine the location property values.
              combineShadows( existingShadow, shadow ) :
              shadow,
          },
          slugs: existingShadow ?
            newState.slugs :
            newState.slugs.concat( slug ),
        };
      }, {
        bySlug: {},
        slugs: [],
      });
    default:
      return state;
  }
}

const strToRE = (str) => new RegExp(str.split('').filter(Boolean).join('.*'), 'i');

export const selectSlugs = (state) => state.shadows.slugs;
export const selectIsLoading = createSelector(
  selectSlugs,
  (slugs) => !slugs.length
);
export const selectFilteredSlugs = createSelector(
  selectSlugs,
  selectSearchTerm,
  (slugs, searchTerm) => {
    if (!searchTerm) {
      return slugs;
    }
    const searchRE = strToRE(searchTerm);
    return slugs.filter((slug) => searchRE.test(slug));
  }
);
