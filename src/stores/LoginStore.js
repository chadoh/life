import alt from '../alt'
import jwt_decode from 'jwt-decode'
import LoginActions from '../actions/LoginActions'
import UserActions from '../actions/UserActions'
import RouterContainer from '../services/RouterContainer'

class LoginStore {

  constructor() {
    this.bindListeners({
      loginUser: LoginActions.loginUser,
      logoutUser: LoginActions.logoutUser,
      updateUser: UserActions.gotUser
    })
    this.state = {
      user: null,
      jwt: null
    }
  }

  loginUser(jwt) {
    var savedJwt = localStorage.getItem('jwt')

    if (savedJwt !== jwt) {
      var nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/' + jwt_decode(jwt).slug

      RouterContainer.get().transitionTo(nextPath)
      localStorage.setItem('jwt', jwt)
      localStorage.setItem('currentUser', JSON.stringify(jwt_decode(jwt)))
    }

    this.setState({
      jwt: jwt,
      user: JSON.parse(localStorage.getItem('currentUser'))
    })
  }

  logoutUser() {
    RouterContainer.get().transitionTo('/login')
    localStorage.removeItem('jwt')

    this.setState({
      jwt: null,
      user: null
    })
  }

  updateUser(user) {
    if (user.id === this.state.user.id) {
      localStorage.setItem('currentUser', JSON.stringify(user))
      this.setState({user: user})
    }
  }

  static isLoggedIn() {
    return !!this.getState().user;
  }
}

export default alt.createStore(LoginStore, 'LoginStore')
