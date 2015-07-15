import alt from '../alt'
import EventActions from '../actions/EventActions'
import Immutable from 'immutable'

class EventStore {

  constructor() {
    this.bindListeners({
      receiveEvents: EventActions.gotEvents,
      createEvent: EventActions.createdEvent,
      destroyEvent: EventActions.destroyedEvent
    })
    this.state = {
      events: Immutable.Map()
    }
  }

  receiveEvents(events) {
    this.setState({events: Immutable.fromJS(events)})
  }

  createEvent(event) {
    debugger
  }

  destroyEvent(id) {
    debugger
  }
}

export default alt.createStore(EventStore, 'EventStore')
