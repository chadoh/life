import alt from '../alt';

class UserActions {
  constructor() {
    this.generateActions('gotUser')
  }
}

export default alt.createActions(UserActions)
