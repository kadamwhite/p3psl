import Content from '../components/Content';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  collapsed: state.collapsed,
});

const mapDispatchToProps = dispatch => ({
  onCollapse() {
    dispatch({ type: 'COLLAPSE_HEADER' });
  },

  onExpand() {
    dispatch({ type: 'EXPAND_HEADER' });
  },
});

export default connect( mapStateToProps, mapDispatchToProps )( Content );
