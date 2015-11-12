import React from 'react';
import LoginActions from '../actions/LoginActions'
import { RouteHandler, Link } from 'react-router';
import RouterContainer from '../services/RouterContainer';
import Avatar from '../components/Avatar';

export default class AuthenticatedApp extends React.Component {
  constructor(props) {
    super(props)
    this.toggleFocus = this.toggleFocus.bind(this)
    this.state = {
      focused: false,
    }
  }

  logout(e) {
    e.preventDefault();
    LoginActions.logout()
    RouterContainer.get().transitionTo('/')
  }

  toggleFocus(e) {
    e.preventDefault()
    this.setState({focused: !this.state.focused})
  }

  renderDropdown() {
    if(this.state.focused) {
      return (
        <div className="nav-dropdown">
          <Link to="user" params={{slug: this.props.user.slug}} className="button">Your Life</Link>
          <Link to="account" className="button">Settings</Link>
          <a href="" onClick={this.logout} className="button">Sign Out</a>
        </div>
      )
    }
  }

  render() {
    return (
      <div ref="nav">
        <Link className="dropdown-link" to="user" params={{slug: this.props.user.slug}} onClick={this.toggleFocus}>
          <Avatar user={this.props.user}/>
          <small className="dropdown-arrow">&#x25bc;</small>
        </Link>
        {this.renderDropdown()}
      </div>
    )
  }
}
