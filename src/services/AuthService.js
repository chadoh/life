import reqwest from 'reqwest';
import {API_URL} from '../config';
import LoginActions from '../actions/LoginActions';

class AuthService {

  checkEmail(email) {
    return reqwest({
      url: API_URL + 'users/check_email',
      method: 'get',
      crossOrigin: true,
      type: 'json',
      data: {
        email: email
      }
    })
  }

  checkSlug(slug) {
    return reqwest({
      url: API_URL + 'users/check_slug',
      method: 'get',
      crossOrigin: true,
      type: 'json',
      data: {
        slug: slug
      }
    })
  }
}

export default new AuthService()
