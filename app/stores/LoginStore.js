import alt from '../alt'
import LoginActions from '../actions/LoginActions'
import UserActions from '../actions/UserActions'
import AuthService from '../services/AuthService'
import RouterContainer from '../services/RouterContainer'

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
    const idToken = googleUser.getAuthResponse().id_token;
    AuthService.recordLogin(idToken).
      then((response, other, stuff) => {
        const user = {
          googleId: profile.getId(),
          name: profile.getName(),
          imageUrl: profile.getImageUrl(),
          email: profile.getEmail(),

          slug: response.user.slug,
          id: response.user.id,
          born: response.user.born,
          paid: response.user.paid,
          payment_frequency: response.user.payment_frequency,
        }
        this.setState({
          user: user,
          idToken: idToken
        })

        const nextPath = user.born ? '/' + user.slug : '/signing-up';
        RouterContainer.get().transitionTo(nextPath)
      })
  }

  static isLoggedIn() {
    return !!this.getState().user;
  }
}

export default alt.createStore(LoginStore, 'LoginStore')
