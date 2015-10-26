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
        'Authorization': 'Bearer ' + LoginStore.getState().idToken
      }
    })
    .then(function(response) {
      UserActions.gotUser(response.user);
    });
  }

  update({id, slug, name, born}) {
    let params = {};
    if(slug) params.slug = slug;
    if(name) params.name = name;
    if(born) params.born = born;
    return reqwest({
      url: API_URL + 'users/' + id,
      data: { user: params },
      method: 'PATCH',
      crossOrigin: true,
      headers: {
        'Authorization': 'Bearer ' + LoginStore.getState().idToken
      }
    })
    .then(function(response) {
      UserActions.gotUser(response.user);
      return response;
    })
  }

}

export default new UserService()
