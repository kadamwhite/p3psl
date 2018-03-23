import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleware = [ thunk ];

// Setup for the Redux Logger. Only logs in development mode.
if ( process.env.NODE_ENV === 'development' ) {
	const { createLogger } = require('redux-logger');
	const logger = createLogger({ collapsed: true });
	middleware.push(logger);
}

// Setup for Redux DevTools extension, see https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  // preloadedState,
  composeEnhancers(applyMiddleware(...middleware)),
);

export default store;
