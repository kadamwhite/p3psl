import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ShadowList from '../components/ShadowList';
import { selectFilteredSlugs } from '../state/reducers/shadows';

const mapStateToProps = (state) => ({
  color: state.color,
  shadows: state.shadows.bySlug,
  slugs: selectFilteredSlugs(state),
});

export default withRouter(connect(mapStateToProps)(ShadowList));
