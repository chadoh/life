import React from 'react';
import LoginStore from '../stores/LoginStore'
import LoginActions from '../actions/LoginActions'
import { Link } from 'react-router';
import RouterContainer from '../services/RouterContainer'

export default class SignedInNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = LoginStore.getState().user;
  }

  logout(e) {
    e.preventDefault();
    LoginActions.logout()
    RouterContainer.get().transitionTo('/')
  }

  render() {
    return (
      <nav>
        <img className="nav-avatar" src={this.state.imageUrl} alt=""/>
        <Link to="account" className="button">Account Details</Link>
        <a href="" onClick={this.logout} className="button">Sign Out</a>
      </nav>
    )
  }
}
