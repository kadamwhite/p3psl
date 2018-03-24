import { RECEIVE_DATA } from '../actions';

const defaultState = {
  bySlug: {},
  slugs: [],
};

const combineShadows = (shadow1, shadow2) => ({
  ...shadow1,
  location: [shadow1.location, shadow2.location].join(', '),
});

const addShadowToDictionary = ( bySlug, shadow ) => {
  const { slug } = shadow;
  const existingShadow = bySlug[ slug ];
  return {
    ...bySlug,
    [ slug ]: existingShadow ?
      // We may have multiple entries for shadows if they
      // occur in two separate blocks. They should have the
      // same stats in both, so we merge the entries and
      // combine the location property values.
      combineShadows( existingShadow, shadow ) :
      shadow,
  };
}

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

export const shadowsLoading = (state) => !state.shadows.slugs.length;
