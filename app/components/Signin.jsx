import React from 'react';
import LoginActions from '../actions/LoginActions';
import LoginStore from '../stores/LoginStore';

export default class Signin extends React.Component {
  constructor(props) {
    super(props)
    this.signin = this.signin.bind(this)
    this.afterSignIn = this.afterSignIn.bind(this)
  }

  componentDidMount() {
    LoginStore.listen(this.afterSignIn);
    window.addEventListener('keyup', this.signin)

    const waitForLoaded = setInterval(() => {
      if(window.gapi) {
        clearInterval(waitForLoaded)
        this.renderSignin()
      }
    }, 30)
  }

  componentWillUnmount() {
    LoginStore.unlisten(this.afterSignIn)
    window.removeEventListener('keyup', this.signin)
  }

  signin(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      this.refs.signin.firstChild.click()
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

  afterSignIn() {
    const user = LoginStore.getState().user;
    if(user.slug) {
      const nextPath = user.born ? '/' + user.slug : '/signing-up';
      this.props.history.pushState(null, nextPath)
    }
  }

  render() {
    return (
      <div {...this.props}>
        <div id="signin" ref="signin"/>
      </div>
    )
  }
}
