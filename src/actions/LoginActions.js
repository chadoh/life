import alt from '../lib/alt';
import jwt_decode from 'jwt-decode'

class LoginActions {
  constructor() {
    this.generateActions('loginUser', 'logoutUser', 'loginUserFromSavedSession', 'getProfile')
  }
}

export default alt.createActions(LoginActions)
