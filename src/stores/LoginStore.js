import alt from '../alt'
import jwt_decode from 'jwt-decode'
import LoginActions from '../actions/LoginActions'
import UserActions from '../actions/UserActions'

class LoginStore {

  constructor() {
    this.bindActions(LoginActions)

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

  logout() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });

    localStorage.removeItem('jwt')
    localStorage.removeItem('currentUser')

    this.setState({
      jwt: null,
      user: null
    })
  }

  gotUser(user) {
    if (this.state.user && this.state.user.id === user.id) {
      localStorage.setItem('currentUser', JSON.stringify(user))
      this.setState({user: user})
    }
  }

  onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    debugger;
  }

  static isLoggedIn() {
    return !!this.getState().user;
  }
}

export default alt.createStore(LoginStore, 'LoginStore')
