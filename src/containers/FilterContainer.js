import { connect } from 'react-redux';
import FilterBar from '../components/FilterBar';
import { search } from '../state/actions';

const mapStateToProps = (state) => ({
  color: state.color,
});

const mapDispatchToProps = (dispatch) => ({
  onSearch: searchTerm => dispatch(search(searchTerm)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
