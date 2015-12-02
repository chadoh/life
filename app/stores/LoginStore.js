import alt from '../lib/alt'
import LoginActions from '../actions/LoginActions'
import UserActions from '../actions/UserActions'
import EventActions from '../actions/EventActions'
import AuthService from '../services/AuthService'
import merge from 'webpack-merge'

class LoginStore {

  constructor() {
    this.bindActions(LoginActions)
    this.bindListeners({
      gotUser: UserActions.gotUser
    })

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

    // friggin' "dispatch in the middle of a dispatch"
    setTimeout(() => {
      UserActions.clear()
      EventActions.clear()
    }, 10)
  }

  gotUser(user) {
    if (this.state.user && this.state.user.id === user.id) {
      this.setState({user: merge(this.state.user, user)})
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
      is_private: response.user.is_private,
    })
    this.setState({user})
  }

  incrementEventCount() {
    let user = this.state.user;
    user.event_count = user.event_count + 1;
    this.setState({user})
  }

  decrementEventCount() {
    let user = this.state.user;
    user.event_count = user.event_count - 1;
    this.setState({user})
  }

  static isLoggedIn() {
    return !!this.getState().user;
  }

  static canView(user) {
    return !user || !user.get('is_private') || (
      this.getState().user && user.get('id') === this.getState().user.id
    )
  }

  static canEdit(user) {
    return user && this.getState().user &&
      user.get('id') === this.getState().user.id
  }
}

export default alt.createStore(LoginStore, 'LoginStore')
