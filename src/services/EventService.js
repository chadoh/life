import request from 'reqwest';
import when from 'when';
import {USER_URL} from '../constants/UserConstants';
import EventActions from '../actions/EventActions';
import LoginStore from '../stores/LoginStore';

class EventService {

  fetchEventsForUser(slug) {
    request({
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

}

export default new EventService()
