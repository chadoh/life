import alt from '../lib/alt';

class UserActions {
  constructor() {
    this.generateActions('requestUser', 'gotUser', 'requestUpdate')
  }
}

export default alt.createActions(UserActions)
