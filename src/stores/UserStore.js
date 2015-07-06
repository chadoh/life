import {USER_GET} from '../constants/UserConstants';
import BaseStore from './BaseStore';

class UserStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._user = {id: null, name: null, email: null, slug: null, born: null};
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case USER_GET:
        this._user = action.user;
        this._user.born = this.makeDateFrom(this._user.born);
        this.emitChange();
        break;
      default:
        break;
    };
  }

  makeDateFrom(someString) {
    return new Date(someString.split('-').map(x => parseInt(x)))
  }

  get user() {
    return this._user;
  }
}

export default new UserStore();
