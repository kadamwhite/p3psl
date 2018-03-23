import { connect } from 'react-redux';
import Background from '../components/Background';

const mapStateToProps = ( store ) => ({
  primary: store.color.primary,
  secondary: store.color.secondary,
});

export default connect(mapStateToProps)(Background);
