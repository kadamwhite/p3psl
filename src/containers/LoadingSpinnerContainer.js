import { connect } from 'react-redux';
import Card from '../components/Card';

const mapStateToProps = (store) => ({
  color: store.color.primary,
});

export default connect(mapStateToProps)(Card);
