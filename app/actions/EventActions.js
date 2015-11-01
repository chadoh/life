import alt from '../lib/alt';

class EventActions {
  constructor() {
    this.generateActions('requestEventsForUser', 'gotEvents', 'createdEvent', 'destroyedEvent')
  }
}

export default alt.createActions(EventActions)
