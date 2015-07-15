import alt from '../alt'
import jwt_decode from 'jwt-decode'
import LoginActions from '../actions/LoginActions'

class LoginStore {

  constructor() {
    this.bindListeners({
      loginUser: LoginActions.loginUser,
      logoutUser: LoginActions.logoutUser
    })
    this.state = {
      user: null,
      jwt: null
    }
  }

  loginUser(jwt) {
    this.setState({
      jwt: jwt,
      user: jwt_decode(jwt)
    })
  }

  logoutUser() {
    this.setState({
      jwt: null,
      user: null
    })
  }

  static isLoggedIn() {
    return !!this.getState().user;
  }
}

export default alt.createStore(LoginStore, 'LoginStore')
