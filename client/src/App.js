import React from 'react';
import './App.css';
import {
  Switch,
  Route,
} from "react-router-dom";
import { refreshToken } from './login/actions'
import { useDispatch } from "react-redux";
import { Login } from './login/login'
import { Loading } from './loading/Loading'
import { Shutters } from './shutters/shutters'
import { Temperatures } from './temperatures/temperature'
import { Profile } from './profile/Profile'
import { Logout } from './logout/Logout'

function App() {

  const dispatch = useDispatch();
  dispatch(refreshToken());

  return (
    <Switch>
      <Route exact path="/" component={Loading}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/app" component={Shutters}/>
      <Route exact path="/shutters" component={Shutters}/>
      <Route exact path="/temperatures" component={Temperatures}/>
      <Route exact path="/profile" component={Profile}/>
      <Route exact path="/logout" component={Logout}/>
    </Switch>
  );
}

export default App;
