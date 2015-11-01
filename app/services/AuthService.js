import reqwest from 'reqwest';
import {API_URL} from '../config';
import LoginActions from '../actions/LoginActions';

class AuthService {

  recordLogin(idToken) {
    return reqwest({
      url: API_URL + 'users/record_login',
      method: 'post',
      crossOrigin: true,
      type: 'json',
      headers: {
        'Authorization': 'Bearer ' + idToken
      }
    }).then(LoginActions.recordedLogin)
  }

  checkEmail(email) {
    return reqwest({
      url: API_URL + 'users/check_email',
      method: 'get',
      crossOrigin: true,
      type: 'json',
      data: {email}
    })
  }

  checkSlug(slug) {
    return reqwest({
      url: API_URL + 'users/check_slug',
      method: 'get',
      crossOrigin: true,
      type: 'json',
      data: {slug}
    })
  }
}

export default new AuthService()
