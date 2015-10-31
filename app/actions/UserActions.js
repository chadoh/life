import alt from '../alt';

class UserActions {
  constructor() {
    this.generateActions('requestUser', 'gotUser', 'requestUpdate')
  }
}

export default alt.createActions(UserActions)
