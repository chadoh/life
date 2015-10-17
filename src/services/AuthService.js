import reqwest from 'reqwest';
import {API_URL} from '../config';
import LoginActions from '../actions/LoginActions';

class AuthService {

  login(email, password) {
    return reqwest({
      url: API_URL + 'users/sign_in',
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: { user: {
        email: email,
        password: password
      }}
    }).then(this.handleAuth)
  }

  signup(payment, name, email, slug, born) {
    return reqwest({
      url: API_URL + 'users',
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: { user: {
        payment_frequency: payment,
        name: name,
        email: email,
        slug: slug,
        born: born
      }}
    }).then(this.handleAuth)
  }

  handleAuth(response) {
    var jwt = response.token;
    LoginActions.loginUser(jwt);
    return response
  }

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
