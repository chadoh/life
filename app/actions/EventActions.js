import alt from '../lib/alt';

class EventActions {
  constructor() {
    this.generateActions('requestEventsForUser', 'gotEvents', 'createdEvent', 'updatedEvent', 'destroyedEvent', 'clear')
  }
}

export default alt.createActions(EventActions)
