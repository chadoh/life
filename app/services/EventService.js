import reqwest from 'reqwest';
import {API_URL} from '../config';
import EventActions from '../actions/EventActions';
import LoginStore from '../stores/LoginStore';

class EventService {

  fetchEventsForUser(slug) {
    return reqwest({
      url: API_URL + 'users/' + slug + '/events',
      data: { time: new Date() },
      method: 'GET',
      crossOrigin: true
    })
    .then(function(response) {
      EventActions.gotEvents(response);
    });
  }

  create(slug, title, emoji, date) {
    return reqwest({
      url: API_URL + 'users/' + slug + '/events',
      method: 'POST',
      data: { event: {
        title: title,
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
