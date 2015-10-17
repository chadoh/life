import alt from '../alt';
import jwt_decode from 'jwt-decode'

class LoginActions {
  constructor() {
    this.generateActions('loginUser', 'logout', 'loginUserFromSavedSession', 'onSignIn')
  }
}

export default alt.createActions(LoginActions)
