import React from 'react';

export default class Signin extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    window.onSignIn = this.onSignIn;
    setTimeout(() => gapi.signin2.render('signin'), 50)
  }

  render() {
    return (
      <div {...this.props}>
        <h2 className="brand">Sign in</h2>
        <div id="signin" data-onsuccess="onSignIn"></div>
      </div>
    )
  }

  onSignIn(googleUser) {
    LoginActions.onSignIn(googleUser)
  }
}
