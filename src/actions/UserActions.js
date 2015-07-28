import alt from '../alt';

class UserActions {
  constructor() {
    this.generateActions('requestUser', 'gotUser')
  }
}

export default alt.createActions(UserActions)
