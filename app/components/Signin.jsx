import React from 'react';
import { Link } from 'react-router';
import LoginActions from '../actions/LoginActions';

export default class Signin extends React.Component {
  constructor(props) {
    super(props)
    this.signin = this.signin.bind(this)
  }

  componentDidMount() {
    window.addEventListener('keyup', this.signin)

    const waitForLoaded = setInterval(() => {
      if(window.gapi) {
        clearInterval(waitForLoaded)
        this.renderSignin()
      }
    }, 30)
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.signin)
  }

  signin(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      React.findDOMNode(this.refs.signin).firstChild.click()
    }
  }

  renderSignin() {
    gapi.signin2.render('signin', {
      longtitle: true,
      width: 220,
      height: 50,
      onsuccess: LoginActions.onSignIn,
    })
  }

  render() {
    return (
      <div {...this.props}>
        <div id="signin" ref="signin"/>
      </div>
    )
  }
}
