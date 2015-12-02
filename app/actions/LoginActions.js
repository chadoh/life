import alt from '../lib/alt';

class LoginActions {
  constructor() {
    this.generateActions(
      'onSignIn', 'logout', 'recordedLogin', 'recordLoginFromSavedSession',
      'incrementEventCount', 'decrementEventCount'
    )
  }
}

export default alt.createActions(LoginActions)
