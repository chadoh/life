import alt from '../lib/alt';

class LoginActions {
  constructor() {
    this.generateActions('onSignIn', 'logout')
  }
}

export default alt.createActions(LoginActions)
