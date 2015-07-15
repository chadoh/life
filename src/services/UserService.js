import request from 'reqwest';
import when from 'when';
import {USER_URL} from '../constants/UserConstants';
import UserActions from '../actions/UserActions';
import LoginStore from '../stores/LoginStore';

class UserService {

  getUser(slug) {
    return request({
      url: USER_URL + slug,
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
