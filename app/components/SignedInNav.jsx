import React from 'react';
import LoginActions from '../actions/LoginActions'
import { Link } from 'react-router';
import RouterContainer from '../services/RouterContainer';
import Avatar from '../components/Avatar';
import history from '../lib/history';

export default class AuthenticatedApp extends React.Component {
  constructor(props) {
    super(props)
    this.toggleFocus = this.toggleFocus.bind(this)
    this.giveTour = this.giveTour.bind(this)
    this.logout = this.logout.bind(this)
    this.state = {
      focused: false,
    }
  }

  logout(e) {
    e.preventDefault();
    LoginActions.logout()
    history.pushState(null, '/')
  }


  toggleFocus(e) {
    e.preventDefault()
    this.setState({focused: !this.state.focused})
  }

  giveTour(e) {
    e.preventDefault()
    alert('now build a tour!')
  }

  renderDropdown() {
    if(this.state.focused) {
      return (
        <div className="nav-dropdown">
          <Link to={`/${this.props.user.slug}`} className="button" activeClassName="active">Your Life</Link>
          <Link to={"/account"} className="button" activeClassName="active">Settings</Link>
          <a href="" onClick={this.logout} className="button">Sign Out</a>
        </div>
      )
    }
  }

  renderHelp() {
    if(window.location.pathname === `/${this.props.user.slug}`) {
      return (
        <a href="#tour" onClick={this.giveTour} className="help-icon">?</a>
      )
    }
  }

  render() {
    return (
      <div ref="nav">
        <Link className="dropdown-link" to={`/${this.props.user.slug}`} onClick={this.toggleFocus}>
          <Avatar user={this.props.user}/>
          <small className="dropdown-arrow">&#x25bc;</small>
        </Link>
        {this.renderDropdown()}
        {this.renderHelp()}
      </div>
    )
  }
}
