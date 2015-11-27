import alt from '../lib/alt'
import immutable from 'alt/utils/ImmutableUtil'
import EventActions from '../actions/EventActions'
import Immutable from 'immutable'
import EventService from '../services/EventService'

@immutable
class EventStore {

  constructor() {
    this.bindListeners({
      requestEventsForUser: EventActions.requestEventsForUser,
      receiveEvents: EventActions.gotEvents,
      createEvent: EventActions.createdEvent,
      destroyEvent: EventActions.destroyedEvent
    })
    this.state = Immutable.Map({
      events: Immutable.Map()
    })
  }

  requestEventsForUser(slug) {
    EventService.fetchEventsForUser(slug)
  }

  receiveEvents(events) {
    this.setState(this.state.set('events', Immutable.fromJS(events)))
  }

  createEvent(event) {
    let weekno = ''+event.weekno;
    let immutableEvent = Immutable.Map(event);
    this.setState(this.state.setIn(['events', weekno],
      this.state.getIn(['events', weekno]) ?
        this.state.getIn(['events', weekno]).push(immutableEvent) :
        Immutable.List([immutableEvent])
    ))
  }

  destroyEvent(event) {
    this.setState(this.state.setIn(['events', ''+event.weekno],
      this.state.getIn(['events', ''+event.weekno]).filter(e => e.get('id') !== event.id)
    ))
  }

  clear() {
    this.setState(this.state.set('events', Immutable.Map()))
  }
}

export default alt.createStore(EventStore, 'EventStore')
