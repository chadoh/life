import request from 'reqwest';
import when from 'when';
import {API_URL} from '../config';
import LoginActions from '../actions/LoginActions';

class AuthService {

  login(email, password) {
    return this.handleAuth(when(request({
      url: API_URL + 'users/sign_in',
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: { user: {
        email: email,
        password: password
      }}
    })));
  }

  logout() {
    LoginActions.logoutUser();
  }

  // signup(username, password, extra) {
  //   return this.handleAuth(when(request({
  //     url: SIGNUP_URL,
  //     method: 'POST',
  //     crossOrigin: true,
  //     type: 'json',
  //     data: {
  //       username, password, extra
  //     }
  //   })));
  // }

  handleAuth(loginPromise) {
    return loginPromise
      .then(function(response) {
        var jwt = response.token;
        LoginActions.loginUser(jwt);
        return true;
      });
  }
}

export default new AuthService()
