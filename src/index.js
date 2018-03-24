import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import BackgroundContainer from './containers/BackgroundContainer';
import AppContainer from './containers/AppContainer';
import store from './state/store';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

window.store = store;

ReactDOM.render((
  <Provider store={ store }>
    <BackgroundContainer />
  </Provider>
), document.getElementById('background'));

ReactDOM.render((
  <Provider store={ store }>
    <Router basename={`/${ process.env.PUBLIC_URL.split('/').pop() }`}>
      <AppContainer />
    </Router>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
