import Content from '../components/Content';
import { connect } from 'react-redux';
import { collapseHeader, expandHeader } from '../state/actions';
import { selectIsLoading } from '../state/reducers/shadows';
import LoadingSpinnerContainer from './LoadingSpinnerContainer';

const mapStateToProps = state => ({
  collapsed: state.collapsed,
  LoadingSpinner: selectIsLoading(state) ?
    LoadingSpinnerContainer :
    null,
});

const mapDispatchToProps = (dispatch) => ({
  onCollapse: () => dispatch(collapseHeader()),
  onExpand: () => dispatch(expandHeader()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
