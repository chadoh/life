import React from 'react';
import LoginActions from '../actions/LoginActions'
import { Link } from 'react-router';
import Avatar from '../components/Avatar';
import history from '../lib/history';

class SignedInNav extends React.Component {
  constructor(props) {
    super(props)
    this.toggleFocus = this.toggleFocus.bind(this)
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
    if(window.location.pathname.match(this.props.user.slug)) {
      return (
        <a href="#tour" onClick={this.props.startTour} className="help-icon">?</a>
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

SignedInNav.propTypes = {
  user: React.PropTypes.shape({
    slug: React.PropTypes.string.isRequired,
  }).isRequired,
  startTour: React.PropTypes.func,
}

export default SignedInNav
