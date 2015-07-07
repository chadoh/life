import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {EVENTS_GET} from '../constants/EventConstants.js';

export default {
  gotEvents: (events) => {
    AppDispatcher.dispatch({
      actionType: EVENTS_GET,
      events: events
    })
  }
}
