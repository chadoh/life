import alt from '../alt';
import jwt_decode from 'jwt-decode'

class LoginActions {
  constructor() {
    this.generateActions('loginUser', 'logoutUser')
  }
}

export default alt.createActions(LoginActions)
