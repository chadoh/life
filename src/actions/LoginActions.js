import alt from '../alt';
import jwt_decode from 'jwt-decode'

class LoginActions {
  constructor() {
    this.generateActions('loginUser', 'logoutUser', 'loginUserFromSavedSession')
  }
}

export default alt.createActions(LoginActions)
