import alt from '../lib/alt'
import LoginActions from '../actions/LoginActions'
import UserActions from '../actions/UserActions'
import AuthService from '../services/AuthService'
import merge from 'webpack-merge'

class LoginStore {

  constructor() {
    this.bindActions(LoginActions)

    this.state = {
      user: null,
      idToken: null
    }
  }

  logout() {
    const waitForLoaded = setInterval(() => {
      if(window.gapi) {
        clearInterval(waitForLoaded)
        if(gapi.auth2) gapi.auth2.getAuthInstance().signOut()
      }
    }, 30)

    this.setState({
      user: null,
      idToken: null
    })
  }

  gotUser(user) {
    if (this.state.user && this.state.user.id === user.id) {
      this.setState({user: user})
    }
  }

  onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    const idToken = googleUser.getAuthResponse().id_token;
    AuthService.recordLogin(idToken)
    const user = {
      googleId: profile.getId(),
      name: profile.getName(),
      imageUrl: profile.getImageUrl(),
      email: profile.getEmail(),
    }
    this.setState({
      user: user,
      idToken: idToken
    })
  }

  recordLoginFromSavedSession() {
    if(this.state.idToken) {
      AuthService.recordLogin(this.state.idToken)
    }
  }

  recordedLogin(response) {
    const user = merge(this.state.user, {
      slug: response.user.slug,
      id: response.user.id,
      born: response.user.born,
      paid: response.user.paid,
      payment_frequency: response.user.payment_frequency,
    })
    this.setState({user})
  }

  static isLoggedIn() {
    return !!this.getState().user;
  }
}

export default alt.createStore(LoginStore, 'LoginStore')
