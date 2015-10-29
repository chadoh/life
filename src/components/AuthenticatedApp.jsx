import React from 'react';
import LoginStore from '../stores/LoginStore'
import { RouteHandler, Link } from 'react-router';
import SignedInNav from './SignedInNav'
import LoginActions from '../actions/LoginActions'

export default class AuthenticatedApp extends React.Component {
  constructor() {
    super()
    this.state = this._getLoginState()
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
        <div className="container-wide nav-buttons">
          {this.headerItems}
        </div>
        <RouteHandler/>
      </div>
    );
  }

  get headerItems() {
    if (window.location.pathname.split('/')[1] === 'signing-up') {
      return null
    } else if (!this.state.userLoggedIn) {
      return <nav>
        <Link to="signin" className="button">My Calendar</Link>
      </nav>
    } else {
      return <SignedInNav/>
    }
  }
}
