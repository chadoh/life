import React from 'react';
import LoginActions from '../actions/LoginActions'
import { RouteHandler, Link } from 'react-router';
import RouterContainer from '../services/RouterContainer'
import Avatar from '../components/Avatar'

export default class AuthenticatedApp extends React.Component {
  constructor(props) {
    super(props)
  }

  logout(e) {
    e.preventDefault();
    LoginActions.logout()
    RouterContainer.get().transitionTo('/')
  }

  render() {
    return (
      <div className="signed-in-nav">
        <Avatar user={this.props.user}/>
        <Link to="account" className="button">Account Details</Link>
        <a href="" onClick={this.logout} className="button">Sign Out</a>
      </div>
    )
  }
}
