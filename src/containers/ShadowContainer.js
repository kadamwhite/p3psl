import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import Shadow from '../components/Shadow';

const mapStateToProps = (state, ownProps) => ({
  color: state.color,
  shadow: state.shadows.bySlug[ownProps.match.params.shadow],
  single: !!ownProps.match.params.shadow,
});

export default withRouter(connect(mapStateToProps)(Shadow));
