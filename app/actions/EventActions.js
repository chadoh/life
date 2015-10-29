import alt from '../alt';

class EventActions {
  constructor() {
    this.generateActions('requestEventsForUser', 'gotEvents', 'createdEvent', 'destroyedEvent')
  }
}

export default alt.createActions(EventActions)
