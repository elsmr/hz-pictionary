import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { rootReducer, rootEpic } from './modules';

export const history = createBrowserHistory();
const middlewares = [
  createEpicMiddleware(rootEpic),
  routerMiddleware(history),
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  connectRouter(history)(rootReducer),
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
