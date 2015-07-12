import {USER_GET} from '../constants/UserConstants';
import BaseStore from './BaseStore';
import { Map } from 'immutable';

class UserStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    // this._user = Map({id: 1, name: "Chad Ostrowski", email: "hi@chadoh.com", slug: "chadoh", born: "1987-03-14"});
    this._user = Map({id: '', name: '', email: '', slug: '', born: ''});
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case USER_GET:
        this._user = Map(action.user);
        this.emitChange();
        break;
      default:
        break;
    };
  }

  get user() {
    return this._user;
  }

  get born() {
    if (this._born) return this._born
    else this._born = new Date(this._user.get('born').split('-'))
    return this._born
  }

  dateOf(weekno) {
    if (!this._user.get('born')) return new Date();
    return new Date(this.born.getFullYear() + Math.floor(weekno/52), this.born.getMonth(), this.born.getDate() + (weekno%52)*7)
  }
}

export default new UserStore();
