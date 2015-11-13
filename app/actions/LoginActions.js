import alt from '../lib/alt';

class LoginActions {
  constructor() {
    this.generateActions('onSignIn', 'logout', 'recordedLogin', 'recordLoginFromSavedSession')
  }
}

export default alt.createActions(LoginActions)
