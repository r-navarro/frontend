import React from 'react';
import { render } from 'react-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { loginReducer as login } from './login/reducer'
import { shutterReducer as shutters } from './shutters/reducer'
import { Router } from 'react-router-dom'
import history from './helpers/history'
import apiMiddleware from './helpers/apiMiddleware/index'

const store = createStore(combineReducers({ login, shutters }), applyMiddleware(apiMiddleware));

render(
  <Provider store={store}>
    <React.StrictMode>
      <Router history={history}>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
