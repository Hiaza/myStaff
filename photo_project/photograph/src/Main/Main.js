import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import "../index.css"

import Home from "../Home/Home";
import Stuff from "../Stuff/Stuff";
import Contact from "../Contact/Contact";

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          
          <nav className="menu-hover">
            <ul>
              <li><NavLink exact to="/">Home</NavLink></li>
              <li><NavLink to="/stuff">Stuff</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </nav>
          
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/stuff" component={Stuff}/>
            <Route path="/contact" component={Contact}/>
          </div>
        
        </div>
      </HashRouter>
    );
  }
}

export default Main;