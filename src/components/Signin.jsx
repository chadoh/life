import React from 'react';
import { Link } from 'react-router';
import LoginActions from '../actions/LoginActions';

export default class Signin extends React.Component {
  constructor(props) {
    super(props)
    this.signin = this.signin.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      gapi.signin2.render('signin', {
        longtitle: true,
        width: 220,
        height: 50,
        onsuccess: this.onSignIn,
      })
    }, 50)

    window.addEventListener('keyup', this.signin)
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.signin)
  }

  render() {
    return (
      <div {...this.props}>
        <div id="signin" ref="signin"/>
      </div>
    )
  }

  signin(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      React.findDOMNode(this.refs.signin).firstChild.click()
    }
  }

  onSignIn(googleUser) {
    LoginActions.onSignIn(googleUser)
  }
}
