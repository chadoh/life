import React from 'react'
import {Link} from 'react-router'

import LoginActions from '../actions/LoginActions'
import LoginStore from '../stores/LoginStore'
import Nav from './Nav'

import logo from '../images/logo-white.svg'
import spinner from '../images/icon-loading-spinner.gif'
import screenshots from '../images/entire.life-screenshots.png'

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
      <div id="top" className="hero sunset-cliffs">
        <div className="landing">
          <Nav>
            <Link to="/">
              <img src={logo} alt="Entire.Life" className="logo"/>
            </Link>
            {/* put Entire.Life logo here */}
          </Nav>
          <h1 className="hero-header container">
            <div className="brand">Plan. Remember.</div>
            <div>Live a Meaningful Life.</div>
          </h1>
            {this.state.loading
              ? <img src={spinner} width="50px" height="50px" alt="loading" style={{margin: '0 auto'}}/>
              : <div id="signin" ref="signin"/>
            }
          <div className="container-wide">
            <p className="light-links">
              We celebrate privacy and will never sell your information – <Link to="/pricing">more info</Link>
            </p>
          </div>
          <div className="devices-photo">
            <img src={screenshots} alt="Entire.Life works on all devices"/>
          </div>
        </div>
      </div>
    )
  }
}
