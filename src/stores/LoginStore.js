import alt from '../alt'
import jwt_decode from 'jwt-decode'
import LoginActions from '../actions/LoginActions'
import UserActions from '../actions/UserActions'

class LoginStore {

  constructor() {
    this.bindListeners({
      loginUser: LoginActions.loginUser,
      loginUserFromSavedSession: LoginActions.loginUserFromSavedSession,
      logoutUser: LoginActions.logoutUser,
      updateUser: UserActions.gotUser
    })
    this.state = {
      user: null,
      jwt: null
    }
  }

  loginUserFromSavedSession() {
    let exp;
    let jwt = localStorage.getItem('jwt')
    if (jwt) exp = new Date(jwt_decode(jwt).exp * 1000)
    else return;

    if (jwt && exp > new Date()) this.loginUser(jwt)
    else this.logoutUser()
  }

  loginUser(jwt) {
    var savedJwt = localStorage.getItem('jwt')

    if (savedJwt !== jwt) {
      localStorage.setItem('jwt', jwt)
      localStorage.setItem('currentUser', JSON.stringify(jwt_decode(jwt)))
    }

    this.setState({
      jwt: jwt,
      user: JSON.parse(localStorage.getItem('currentUser'))
    })
  }

  logoutUser() {
    localStorage.removeItem('jwt')
    localStorage.removeItem('currentUser')

    this.setState({
      jwt: null,
      user: null
    })
  }

  updateUser(user) {
    if (this.state.user && this.state.user.id === user.id) {
      localStorage.setItem('currentUser', JSON.stringify(user))
      this.setState({user: user})
    }
  }

  static isLoggedIn() {
    return !!this.getState().user;
  }
}

export default alt.createStore(LoginStore, 'LoginStore')
