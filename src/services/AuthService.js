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

  logout() {
    LoginActions.logoutUser();
  }

  // signup(username, password, extra) {
  //   return this.handleAuth(when(reqwest({
  //     url: SIGNUP_URL,
  //     method: 'POST',
  //     crossOrigin: true,
  //     type: 'json',
  //     data: {
  //       username, password, extra
  //     }
  //   })));
  // }

  handleAuth(response) {
    var jwt = response.token;
    LoginActions.loginUser(jwt);
    return response
  }
}

export default new AuthService()
