import { connect } from 'react-redux';
import ShadowList from '../components/ShadowList';

const mapStateToProps = (state) => ({
  color: state.color,
  slugs: state.shadows.slugs,
  shadows: state.shadows.bySlug,
});

export default connect(mapStateToProps)(ShadowList);
