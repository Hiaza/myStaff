import React from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import store from 'store';
import '../styles/Main.css';
import Weather from "./Weather"
import isLoggedIn from './is_logged_in';
import {Redirect, Switch, Route } from 'react-router-dom';

const handleLogout = history => () => {
  store.remove('loggedIn');
  history.push('/login');
};

const Cms = ({ history }) => {
  if (!isLoggedIn()) {
    console.log("Here")
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <div className = "big-block">
        <div className = "temp">
            <h4  onClick={handleLogout(history)}> Logout </h4>
        </div>
      </div>
      <div>
        <Weather />
      </div>
    </div>
  );
};

export default Cms;