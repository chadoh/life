import alt from '../lib/alt';

class EventActions {
  constructor() {
    this.generateActions('requestEventsForUser', 'gotEvents', 'createdEvent', 'destroyedEvent', 'clear')
  }
}

export default alt.createActions(EventActions)
