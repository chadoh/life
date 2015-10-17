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

  logout() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });

    this.setState({
      jwt: null,
      user: null
    })
  }

  gotUser(user) {
    if (this.state.user && this.state.user.id === user.id) {
      this.setState({user: user})
    }
  }

  onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
  }

  static isLoggedIn() {
    return !!this.getState().user;
  }
}

export default alt.createStore(LoginStore, 'LoginStore')
