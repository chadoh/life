import reqwest from 'reqwest';
import {API_URL} from '../config';
import EventActions from '../actions/EventActions';
import LoginStore from '../stores/LoginStore';

class EventService {

  fetchEventsForUser(slug) {
    return reqwest({
      url: API_URL + 'users/' + slug + '/events',
      method: 'GET',
      crossOrigin: true
    })
    .then(function(response) {
      EventActions.gotEvents(response);
    });
  }

  create(slug, summary, emoji, date) {
    return reqwest({
      url: API_URL + 'users/' + slug + '/events',
      method: 'POST',
      data: { event: {
        summary: summary,
        emoji: emoji,
        date: date
      }},
      crossOrigin: true,
      headers: {
        'Authorization': 'Bearer ' + LoginStore.getState().idToken
      }
    })
    .then(response => {
      EventActions.createdEvent(response.event)
    })
  }

  destroy(slug, id, weekno) {
    return reqwest({
      url: API_URL + 'users/' + slug + '/events/' + id,
      method: 'DELETE',
      type: 'json', // needed bc of bug reqwest https://github.com/ded/reqwest/issues/160
      crossOrigin: true,
      headers: {
        'Authorization': 'Bearer ' + LoginStore.getState().idToken
      }
    })
    .then(response => {
      EventActions.destroyedEvent({id: id, weekno: weekno})
    })
  }

}

export default new EventService()
