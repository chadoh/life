import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {USER_GET} from '../constants/UserConstants.js';

export default {
  gotUser: (user) => {
    AppDispatcher.dispatch({
      actionType: USER_GET,
      user: user
    })
  }
}
