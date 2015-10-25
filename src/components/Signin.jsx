import React from 'react';

export default class Signin extends React.Component {
  constructor(props) {
    super(props)
    this.signin = this.signin.bind(this)
  }

  componentDidMount() {
    window.onSignIn = this.onSignIn;

    setTimeout(() => {
      gapi.signin2.render('signin', {
        longtitle: true,
        width: 220,
        height: 50,
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
        <div id="signin" ref="signin" data-onsuccess="onSignIn"></div>
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
