import reqwest from 'reqwest';
import {API_URL} from '../config';
import UserActions from '../actions/UserActions'
import LoginStore from '../stores/LoginStore';

class AuthService {

  charge(user, token) {
    return reqwest({
      url: API_URL + 'users/' + user + '/charge',
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
        token: token
      },
      headers: {
        'Authorization': 'Bearer ' + LoginStore.getState().idToken
      }
    }).then(response => {
      UserActions.gotUser(response.user)
      return response
    })
  }
}

export default new AuthService()
