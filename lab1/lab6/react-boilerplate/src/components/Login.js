import React, { Component } from "react";
import {Form, Message } from 'semantic-ui-react';
import store from 'store';
import isLoggedIn from './is_logged_in';
import { Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/styles.css';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const { username, password } = this.state;

    this.setState({ error: false });

    const { history } = this.props;
    
    if (!(username === 'artem' && password === '1111')) {
      return this.setState({ error: true });
    }

    console.log("you're logged in.");
    store.set('loggedIn', true);
    history.push('/');
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  render() {
    const { error } = this.state;
    if (isLoggedIn()) {
        return <Redirect to="/" />;
      }
    return (
        <div className = "container">
        <div className="login-form">
            <div className="main-div">
                <div className="panel">
                    <h2>Welcome</h2>
                    <p>Please enter your login and password</p>
                </div> 
                <div id="Login">
                    <Form error={error} onSubmit={this.onSubmit}>
                        {error && <Message
                        id = "error"
                        error={error}
                        content="That username/password is incorrect. Try again!"
                        />}
                        <div className="form-group">
                            <Form.Input type="text"  name="username" id="inputEmail" placeholder="Login" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <Form.Input type="password"  name="password" id="inputPassword" onChange={this.handleChange} placeholder="Password"/>
                        </div>
                        <button className = "btn btn-primary" type="submit">Login</button>
                    </Form>   
                </div>
            </div>
        </div>
    </div>);
  }
}

export default Login;