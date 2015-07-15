import alt from '../alt';

class EventActions {
  constructor() {
    this.generateActions('gotEvents', 'createdEvent', 'destroyedEvent')
  }
}

export default alt.createActions(EventActions)
