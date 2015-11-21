import React from 'react';
import LoginStore from '../stores/LoginStore'
import LoginActions from '../actions/LoginActions'
import { Link } from 'react-router';
import AuthService from '../services/AuthService'
import SignedInNav from './SignedInNav'

export default class Nav extends React.Component {
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

  headerItems() {
    if (!this.state.user || !this.state.user.slug) {
      return <Link to={"/signin"} className="button">Sign in</Link>
    } else {
      return <SignedInNav user={this.state.user} giveTour={this.props.giveTour}/>
    }
  }

  render() {
    return (
      <nav className="nav-buttons">
        <div className="nav-items">
          {this.headerItems()}
        </div>
        {this.props.children}
      </nav>
    )
  }
}
