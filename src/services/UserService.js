import request from 'reqwest';
import when from 'when';
import {API_URL} from '../config';
import UserActions from '../actions/UserActions';
import LoginStore from '../stores/LoginStore';

class UserService {

  getUser(slug) {
    return request({
      url: API_URL + 'users/' + slug,
      method: 'GET',
      crossOrigin: true,
      headers: {
        'Authorization': 'Bearer ' + LoginStore.jwt
      }
    })
    .then(function(response) {
      UserActions.gotUser(response.user);
    });
  }

}

export default new UserService()
