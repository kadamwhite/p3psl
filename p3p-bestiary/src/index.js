import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import BackgroundContainer from './containers/BackgroundContainer';
import App from './components/App';
import store from './state/store';
import { loadData } from './state/actions';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

window.store = store;

// Kick off initial data load immediately
store.dispatch(loadData());

ReactDOM.render((
  <Provider store={ store }>
    <BackgroundContainer />
  </Provider>
), document.getElementById('background'));

ReactDOM.render((
  <Provider store={ store }>
    <Router>
      <App />
    </Router>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
