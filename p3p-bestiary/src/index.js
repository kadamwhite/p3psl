import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Background from './components/Background';
import App from './components/App';
import store from './state/store';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<Background />, document.getElementById('background'));

ReactDOM.render((
  <Provider store={ store }>
    <Router>
      <App />
    </Router>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
