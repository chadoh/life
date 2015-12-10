import React from 'react';
import LoginActions from '../actions/LoginActions'
import { Link } from 'react-router';
import Avatar from '../components/Avatar';
import history from '../lib/history';

class SignedInNav extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
    this.toggleAccountDropdown = this.toggleAccountDropdown.bind(this)
    this.toggleHelpDropdown = this.toggleHelpDropdown.bind(this)
    this.toggleDropdowns = this.toggleDropdowns.bind(this)
    this.state = {
      showAccountDropdown: false,
      showHelpDropdown: false,
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.toggleDropdowns, false)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.toggleDropdowns, false)
  }

  logout(e) {
    e.preventDefault();
    LoginActions.logout()
    history.pushState(null, '/')
  }

  toggleDropdowns(e) {
    const [a, b] = [this.refs.accountDropdown, this.refs.accountLink]
    if((a && a.contains(e.target)) || b.contains(e.target)) {
      this.setState({showAccountDropdown: true});
    } else {
      this.setState({showAccountDropdown: false});
    }

    const [c, d] = [this.refs.helpDropdown, this.refs.helpLink]
    if((c && c.contains(e.target)) || (d && d.contains(e.target))) {
      this.setState({showHelpDropdown: true});
    } else {
      this.setState({showHelpDropdown: false});
    }
  }

  toggleAccountDropdown(e) {
    e.preventDefault()
    const show = !this.state.showAccountDropdown;
    setTimeout(() => {
      this.setState({showAccountDropdown: show})
    }, 20)
  }

  toggleHelpDropdown(e) {
    e.preventDefault()
    const show = !this.state.showHelpDropdown;
    setTimeout(() => {
      this.setState({showHelpDropdown: show})
    }, 20)
  }

  renderAccountDropdown() {
    if(this.state.showAccountDropdown) {
      return (
        <div ref="accountDropdown" className="nav-dropdown">
          <Link to={`/${this.props.user.slug}`} className="button" activeClassName="active">Your Life</Link>
          <Link to={"/account"} className="button" activeClassName="active">Settings</Link>
          <a href="" onClick={this.logout} className="button">Sign Out</a>
        </div>
      )
    }
  }

  renderHelpDropdown() {
    if(this.state.showHelpDropdown) {
      return (
        <div ref="helpDropdown" className="nav-dropdown">
          <a href="#" onClick={this.props.startTour} className="button">Tour</a>
          <Link to="/quiz" className="button">Welcome Quiz</Link>
        </div>
      )
    }
  }

  renderHelp() {
    if(window.location.pathname.match(this.props.user.slug)) {
      return (
        <div ref="helpLink" style={{display: 'inline-block'}}>
          <a href="#help" onClick={this.toggleHelpDropdown} className="help-icon">?</a>
        </div>
      )
    }
  }

  render() {
    return (
      <div ref="nav">
        <div ref="accountLink" style={{display: 'inline-block'}}>
          <Link className="dropdown-link" to='/account' onClick={this.toggleAccountDropdown}>
            <Avatar user={this.props.user}/>
            <small className="dropdown-arrow">&#x25bc;</small>
          </Link>
        </div>
        {this.renderAccountDropdown()}
        {this.renderHelp()}
        {this.renderHelpDropdown()}
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
