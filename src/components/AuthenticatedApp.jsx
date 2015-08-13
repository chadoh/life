'use strict';

import React from 'react';
import LoginStore from '../stores/LoginStore'
import { Route, RouteHandler, Link } from 'react-router';
import AuthService from '../services/AuthService'

export default class AuthenticatedApp extends React.Component {
  constructor() {
    super()
    this.state = this._getLoginState();
  }

  _getLoginState() {
    return {
      userLoggedIn: LoginStore.isLoggedIn(),
      user: LoginStore.getState().user
    };
  }

  componentDidMount() {
    this.changeListener = this._onChange.bind(this);
    LoginStore.listen(this.changeListener);
  }

  _onChange() {
    this.setState(this._getLoginState());
  }

  componentWillUnmount() {
    LoginStore.unlisten(this.changeListener);
  }

  render() {
    return (
      <div>
        <div className="container-wide nav-button">
          {this.headerItems}
        </div>
        <RouteHandler/>
      </div>
    );
  }

  logout(e) {
    e.preventDefault();
    AuthService.logout();
  }

  get headerItems() {
    if (!this.state.userLoggedIn) {
      return <Link to="login" className="button">Sign In</Link>
    } else if ('/' + this.state.user.slug === window.location.pathname) {
      return <nav>
        <Link to="account" className="button">Account Details</Link>
        <a href="" onClick={this.logout} className="button">Sign Out</a>
      </nav>
    } else {
      return <Link to="user" params={{slug: this.state.user.slug}} className="button">You</Link>
    }
  }
}
