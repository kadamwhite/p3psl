import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import App from '../components/App';
import { loadData } from '../state/actions';

class AppContainer extends PureComponent {
  componentDidMount() {
    // Kick off initial data load immediately
    this.props.onMount();
  }
  render() {
    return (
      <App />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onMount: () => dispatch(loadData()),
});

export default withRouter(connect(null, mapDispatchToProps)(AppContainer));
