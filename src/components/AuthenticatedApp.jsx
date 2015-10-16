'use strict';

import React from 'react';
import LoginStore from '../stores/LoginStore'
import { Route, RouteHandler, Link } from 'react-router';
import AuthService from '../services/AuthService'
import RouterContainer from '../services/RouterContainer'
import PaymentForm from './PaymentForm'

export default class AuthenticatedApp extends React.Component {
  constructor() {
    super()

    this.state = { profile: LoginStore.getState().profile }

    this.changeListener = this._onChange.bind(this);
  }

  componentDidMount() {
    LoginStore.listen(this.changeListener);
  }

  _onChange() {
    this.setState({profile: LoginStore.getState().profile});
  }

  componentWillUnmount() {
    LoginStore.unlisten(this.changeListener);
  }

  render() {
    return (
      <div>
        <div className="container-wide nav-buttons">
          {this.headerItems}
        </div>
        <RouteHandler/>
      </div>
    );
  }

  get headerItems() {
    const path = window.location.pathname.split('/')[1]
    if (path === 'signup') {
      return null
    } else if (!LoginStore.getState().idToken) {
      return <nav>
        <a href="#sign-in" className="button" onClick={this.showLock}>You</a>
      </nav>
    } else if (!this.state.profile) {
      return null
    } else if (path === this.state.profile.nickname) {
      return <nav>
        <Link to="account" className="button">Account Details</Link>
        <a href="" onClick={this.logout} className="button">Sign Out</a>
      </nav>
    } else {
      return <nav>
        <Link to="user" params={{slug: this.state.profile.nickname}} className="button">You</Link>
      </nav>
    }
  }

  showLock(e) {
    e.preventDefault()
    LoginStore.getState().lock.show()
  }

  // logout(e) {
  //   e.preventDefault()
  //   AuthService.logout()
  //   RouterContainer.get().transitionTo('/login')
  // }

}
