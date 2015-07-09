import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {EVENTS_GET, EVENT_CREATE, EVENT_DESTROY} from '../constants/EventConstants.js';

export default {
  gotEvents: (events) => {
    AppDispatcher.dispatch({
      actionType: EVENTS_GET,
      events: events
    })
  },
  createdEvent: (event) => {
    AppDispatcher.dispatch({
      actionType: EVENT_CREATE,
      event: event
    })
  },
  destroyedEvent: (id) => {
    AppDispatcher.dispatch({
      actionType: EVENT_DESTROY,
      id: id
    })
  }
}
