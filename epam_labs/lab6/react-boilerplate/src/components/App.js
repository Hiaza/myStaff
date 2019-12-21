import React, { Component } from "react";
import {BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Main from './Temp';
import Login from './Login';
import NotFound from './Login';

const App = () => (
    <BrowserRouter>
        <div className="app-routes">
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/login" component={Login} />
                <Route path='*' component={NotFound} />
            </Switch>
        </div>
    </BrowserRouter>
);


export default App;