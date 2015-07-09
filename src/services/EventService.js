import request from 'reqwest';
import when from 'when';
import {USER_URL} from '../constants/UserConstants';
import EventActions from '../actions/EventActions';
import LoginStore from '../stores/LoginStore';

class EventService {

  fetchEventsForUser(slug) {
    return request({
      url: USER_URL + slug + '/events',
      method: 'GET',
      crossOrigin: true,
      headers: {
        'Authorization': 'Bearer ' + LoginStore.jwt
      }
    })
    .then(function(response) {
      EventActions.gotEvents(response.events);
    });
  }

  create(slug, summary, emoji, date) {
    return request({
      url: USER_URL + slug + '/events',
      method: 'POST',
      data: { event: {
        summary: summary,
        emoji: emoji,
        date: date
      }},
      crossOrigin: true,
      headers: {
        'Authorization': 'Bearer ' + LoginStore.jwt
      }
    })
    .then(response => {
      EventActions.createdEvent(response.event)
    })
  }

  destroy(slug, id) {
    return request({
      url: USER_URL + slug + '/events/' + id,
      method: 'DELETE',
      type: 'json', // needed bc of bug reqwest https://github.com/ded/reqwest/issues/160
      crossOrigin: true,
      headers: {
        'Authorization': 'Bearer ' + LoginStore.jwt
      }
    })
    .then(response => {
      EventActions.destroyedEvent(id)
    })
  }

}

export default new EventService()
