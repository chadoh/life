import alt from '../lib/alt';

class UserActions {
  constructor() {
    this.generateActions('requestUser', 'gotUser', 'requestUpdate', 'clear')
  }
}

export default alt.createActions(UserActions)
