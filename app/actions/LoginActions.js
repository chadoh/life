import alt from '../lib/alt';

class LoginActions {
  constructor() {
    this.generateActions('onSignIn', 'logout', 'recordedLogin')
  }
}

export default alt.createActions(LoginActions)
