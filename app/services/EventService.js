import reqwest from 'reqwest';
import {API_URL} from '../config';
import EventActions from '../actions/EventActions';
import LoginStore from '../stores/LoginStore';
import LoginActions from '../actions/LoginActions';

class EventService {

  fetchEventsForUser(slug) {
    return reqwest({
      url: API_URL + 'users/' + slug + '/events',
      data: { time: new Date() },
      method: 'GET',
      crossOrigin: true,
      headers: {
        'Authorization': 'Bearer ' + LoginStore.getState().idToken
      }
    })
    .then(function(response) {
      EventActions.gotEvents(response);
    });
  }

  create({slug, title, emoji, date, description}) {
    if(!slug) {
      console.error(new Error('Need user slug to create event'))
      return false;
    }
    return reqwest({
      url: API_URL + 'users/' + slug + '/events',
      method: 'POST',
      data: { event: arguments[0]},
      crossOrigin: true,
      headers: {
        'Authorization': 'Bearer ' + LoginStore.getState().idToken
      }
    })
    .then(response => {
      EventActions.createdEvent(response.event)
      LoginActions.incrementEventCount()
      return response
    })
  }

  update({slug, id, title, emoji, date, description, weekno}) {
    if(!slug && !id && !weekno) {
      console.error(new Error('Need user slug, event id, and event weekno to update event'))
      return false;
    }
    EventActions.destroyedEvent({id, weekno})
    return reqwest({
      url: API_URL + 'users/' + slug + '/events/' + id,
      method: 'PATCH',
      data: { event: arguments[0]},
      crossOrigin: true,
      headers: {
        'Authorization': 'Bearer ' + LoginStore.getState().idToken
      }
    })
    .then(response => {
      EventActions.createdEvent(response.event)
      return response
    })
  }

  save({slug, id, title, emoji, date, description, weekno}) {
    if(id) return this.update(arguments[0]);
    else return this.create(arguments[0]);
  }

  destroy(slug, id, weekno) {
    if(!slug && !id) {
      console.error(new Error('Need user slug and event id to destroy event'))
      return false;
    }
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
      EventActions.destroyedEvent({id, weekno})
      LoginActions.decrementEventCount()
      return response
    })
  }

}

export default new EventService()
