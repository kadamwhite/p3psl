import Content from '../components/Content';
import { connect } from 'react-redux';
import { collapseHeader, expandHeader } from '../state/actions';

const mapStateToProps = state => ({
  collapsed: state.collapsed,
});

const mapDispatchToProps = ( dispatch ) => ({
  onCollapse: () => dispatch(collapseHeader()),
  onExpand: () => dispatch(expandHeader()),
});

export default connect( mapStateToProps, mapDispatchToProps )( Content );
