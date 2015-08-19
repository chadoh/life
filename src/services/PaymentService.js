import reqwest from 'reqwest';
import {API_URL} from '../config';
import UserActions from '../actions/UserActions'

class AuthService {

  charge(user_id, token) {
    return reqwest({
      url: API_URL + 'users/' + user_id + '/charge',
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
        token: token
      }
    }).then(response => {
      UserActions.gotUser(response.user)
      return response
    })
  }
}

export default new AuthService()
