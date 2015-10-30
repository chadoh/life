import alt from '../lib/alt'
import EventActions from '../actions/EventActions'
import Immutable from 'immutable'
import EventService from '../services/EventService'

class EventStore {

  constructor() {
    this.bindListeners({
      requestEventsForUser: EventActions.requestEventsForUser,
      receiveEvents: EventActions.gotEvents,
      createEvent: EventActions.createdEvent,
      destroyEvent: EventActions.destroyedEvent
    })
    this.state = {
      events: Immutable.Map()
    }
  }

  requestEventsForUser(slug) {
    this.setState({events: Immutable.Map()})
    EventService.fetchEventsForUser(slug)
  }

  receiveEvents(events) {
    this.setState({events: Immutable.fromJS(events)})
  }

  createEvent(event) {
    let weekno = ''+event.weekno;
    let immutableEvent = Immutable.Map(event);
    this.setState({
      events: this.state.events.set(
        weekno,
        this.state.events.get(weekno) ?
          this.state.events.get(weekno).push(immutableEvent) :
          Immutable.List([immutableEvent])
      )
    })
  }

  destroyEvent(event) {
    this.setState({
      events: this.state.events.set(
        ''+event.weekno,
        this.state.events.get(''+event.weekno).filter(e => e.get('id') !== event.id)
      )
    })
  }
}

export default alt.createStore(EventStore, 'EventStore')
