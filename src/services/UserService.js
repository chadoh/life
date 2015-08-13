import reqwest from 'reqwest';
import {API_URL} from '../config';
import UserActions from '../actions/UserActions';
import LoginStore from '../stores/LoginStore';

class UserService {

  getUser(slug) {
    return reqwest({
      url: API_URL + 'users/' + slug,
      method: 'GET',
      crossOrigin: true,
      headers: {
        'Authorization': 'Bearer ' + LoginStore.getState().jwt
      }
    })
    .then(function(response) {
      UserActions.gotUser(response.user);
    });
  }

  update(id, slug, name, email, born, password, password_confirmation) {
    let userData = { user: {
      slug: slug,
      name: name,
      email: email,
      born: born,
    }}
    if (password) {
      userData.password = password;
      userData.password_confirmation = password_confirmation;
    }
    return reqwest({
      url: API_URL + 'users/' + id,
      data: userData,
      method: 'PATCH',
      crossOrigin: true,
      headers: {
        'Authorization': 'Bearer ' + LoginStore.getState().jwt
      }
    })
    .then(function(response) {
      UserActions.gotUser(response.user);
    })
  }

}

export default new UserService()
