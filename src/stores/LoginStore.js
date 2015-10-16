import alt from '../lib/alt'
import jwt_decode from 'jwt-decode'
import LoginActions from '../actions/LoginActions'
import UserActions from '../actions/UserActions'
import { AUTH0TOKEN } from '../config'

class LoginStore {

  constructor() {
    this.bindActions(LoginActions)

    this.lock = new Auth0Lock(AUTH0TOKEN, 'entire-life.auth0.com')

    this.state = {
      lock: this.lock,
      idToken: this.getIdToken(),
      profile: null
    }
  }

  getIdToken() {
    var idToken = localStorage.getItem('userToken');
    var authHash = this.lock.parseHash(window.location.hash);
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token
        localStorage.setItem('userToken', authHash.id_token);
      }
      if (authHash.error) {
        console.log("Error signing in", authHash);
        return null;
      }
    }
    return idToken;
  }

  getProfile() {
    if (this.state.idToken) {
      this.lock.getProfile(this.state.idToken, (err, profile) => {
        if (err) {
          console.log("Error loading the Profile", err);
          return;
        }
        this.setState({profile: profile})
      })
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
    localStorage.removeItem('userToken')

    this.setState({
      idToken: null,
      profile: null
    })
  }

  gotUser(user) {
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
