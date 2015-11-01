import React from 'react';
import LoginStore from '../stores/LoginStore'
import LoginActions from '../actions/LoginActions'
import { Route, RouteHandler, Link } from 'react-router';
import AuthService from '../services/AuthService'
import RouterContainer from '../services/RouterContainer'
import '../lib/googleAuth'

export default class AuthenticatedApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = this._getLoginState()
    this.headerItems = this.headerItems.bind(this)
    this._onChange = this._onChange.bind(this);
  }

  _getLoginState() {
    return {
      user: LoginStore.getState().user
    };
  }

  componentDidMount() {
    LoginStore.listen(this._onChange);
  }


  _onChange() {
    this.setState(this._getLoginState());
  }

  componentWillUnmount() {
    LoginStore.unlisten(this._onChange);
  }

  render() {
    return (
      <div>
        <div className="container-wide nav-buttons">
          {this.headerItems()}
        </div>
        <RouteHandler/>
      </div>
    );
  }

  logout(e) {
    e.preventDefault();
    LoginActions.logout()
    RouterContainer.get().transitionTo('/')
  }

  headerItems() {
    if (window.location.pathname.split('/')[1] === 'signing-up') {
      return null
    } else if (!this.state.user.slug) {
      return <nav>
        <Link to="signin" className="button">Sign in</Link>
      </nav>
    } else if ('/' + this.state.user.slug === window.location.pathname) {
      return <nav>
        <Link to="account" className="button">Account Details</Link>
        <a href="" onClick={this.logout} className="button">Sign Out</a>
      </nav>
    } else {
      return <nav><Link to="user" params={{slug: this.state.user.slug}} className="button">You</Link></nav>
    }
  }
}
