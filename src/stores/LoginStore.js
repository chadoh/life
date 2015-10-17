import alt from '../alt'
import LoginActions from '../actions/LoginActions'
import UserActions from '../actions/UserActions'

class LoginStore {

  constructor() {
    this.bindActions(LoginActions)

    this.state = {
      user: null,
      idToken: null
    }
  }

  logout() {
    gapi.auth2.getAuthInstance().signOut()

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
    const user = {
      id: profile.getId(),
      name: profile.getName(),
      imageUrl: profile.getImageUrl(),
      email: profile.getEmail()
    }
    this.setState({
      user: user,
      idToken: googleUser.getAuthResponse().idToken
    })
  }

  static isLoggedIn() {
    return !!this.getState().user;
  }
}

export default alt.createStore(LoginStore, 'LoginStore')
