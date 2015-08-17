import reqwest from 'reqwest';
import {API_URL} from '../config';
import LoginActions from '../actions/LoginActions';

class ConfirmationService {

  fetchUserFrom(token) {
    return reqwest({
      url: API_URL + 'users/confirmation',
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      data: { confirmation_token: token }
    })
  }

  confirm(token, password, passwordConfirmation) {
    return reqwest({
      url: API_URL + 'users/confirmation',
      method: 'post',
      crossOrigin: true,
      type: 'json',
      data: { user: {
        confirmation_token: token,
        password: password,
        password_confirmation: passwordConfirmation
      }}
    }).then(this.handleAuth)
  }

  handleAuth(response) {
    var jwt = response.token;
    LoginActions.loginUser(jwt);
    return response
  }
}

export default new ConfirmationService()
