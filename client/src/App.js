import React from 'react';
import './App.css';
import {
  Switch,
  Route,
} from "react-router-dom";
import { refreshToken } from './login/actions'
import { useDispatch } from "react-redux";
import { Login } from './login/login'
import { Shutters } from './shutters/shutters'

function App() {

  const dispatch = useDispatch();
  dispatch(refreshToken());

  return (
    <Switch>
      <Route exact path="/login" component={Login}>
      </Route>
      <Route path="/" component={Shutters}>
      </Route>
    </Switch>
  );
}

export default App;
