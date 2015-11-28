import React from 'react';
import LoginActions from '../actions/LoginActions';
import LoginStore from '../stores/LoginStore';
import spinner from '../images/icon-loading-spinner.gif';

export default class Signin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
    this.signin = this.signin.bind(this)
    this.onSignIn = this.onSignIn.bind(this)
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
      onsuccess: this.onSignIn,
    })
  }

  onSignIn(googleUser) {
    this.setState({loading: true})
    LoginActions.onSignIn(googleUser)
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
        {this.state.loading
          ? <img src={`/${spinner}`} width="100px" height="100px" alt="loading" style={{marginTop: '1.5rem'}}/>
          : <div id="signin" ref="signin"/>
        }
      </div>
    )
  }
}
