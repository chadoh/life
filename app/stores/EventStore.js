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
      updateEvent: EventActions.updatedEvent,
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
        this.state.getIn(['events', weekno]).push(immutableEvent).sortBy(event => event.get('date')) :
        Immutable.List([immutableEvent])
    ))
  }

  updateEvent(event) {
    let weekno = ''+event.weekno;
    let immutableEvent = Immutable.Map(event);

    const list = this.state.getIn(['events', weekno])
    let old = list.find(el => el.get('id') === event.id)

    const newState = this.state.setIn(['events', weekno, list.indexOf(old)], immutableEvent)
    this.setState(this.state.setIn(['events', weekno],
      newState.getIn(['events', weekno]).sortBy(event => event.get('date'))
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

  static eventsForMonth(monthno) {
    const events = this.state.get('events')

    return (events.get(`${monthno*4}`) || new Immutable.List()).
      concat(events.get(`${monthno*4 + 1}`) || new Immutable.List()).
      concat(events.get(`${monthno*4 + 2}`) || new Immutable.List()).
      concat(events.get(`${monthno*4 + 3}`) || new Immutable.List())
  }
}

export default alt.createStore(EventStore, 'EventStore')
