import reqwest from 'reqwest';
import {API_URL} from '../config';
import UserActions from '../actions/UserActions';
import LoginStore from '../stores/LoginStore';

class UserService {

  getUser(slug) {
    return reqwest({
      url: API_URL + 'users/' + slug,
      method: 'GET',
      crossOrigin: true,
      headers: {
        'Authorization': 'Bearer ' + LoginStore.getState().idToken
      }
    })
    .then(function(response) {
      UserActions.gotUser(response.user);
    });
  }

  update({id, slug, name, born}) {
    let params = {};
    return reqwest({
      url: API_URL + 'users/' + id,
      data: { user: arguments[0] },
      method: 'PATCH',
      crossOrigin: true,
      headers: {
        'Authorization': 'Bearer ' + LoginStore.getState().idToken
      }
    })
    .then(function(response) {
      UserActions.gotUser(response.user);
      return response;
    })
  }

}

export default new UserService()
