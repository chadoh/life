import alt from '../lib/alt'
import immutable from 'alt/utils/ImmutableUtil'
import { Map } from 'immutable'
import UserActions from '../actions/UserActions'
import UserService from '../services/UserService';
import history from '../lib/history';

var _blankUser = Map({id: '', name: '', email: '', slug: '', born: ''})

@immutable
class UserStore {

  constructor() {
    this.bindListeners({
      requestUser: UserActions.requestUser,
      receiveUser: UserActions.gotUser,
      requestUpdate: UserActions.requestUpdate,
      clear: UserActions.clear
    })
    this.state = Map({
      user: _blankUser
    })
  }

  requestUser(slug) {
    UserService.getUser(slug)
  }

  receiveUser(user) {
    this.setState(this.state.set('user', Map(user)))
  }

  requestUpdate({id, slug, name, born, is_private}) {
    UserService.update(arguments[0]).then(() => {
      history.pushState(null, `/${slug}`)
    })
  }

  clear() {
    this.setState(this.state.set('user', _blankUser))
  }

  static startOf(weekno) {
    let born = this.getState().getIn(['user', 'born']);
    if (!born) throw Error("User has no birth date set yet!");

    let [year, month, day] = born.split('-').map(x => parseInt(x))
    born = new Date(year, month - 1, day)

    return new Date(born.getFullYear() + Math.floor(weekno/52), born.getMonth(), born.getDate() + (weekno%52)*7)
  }

  static endOf(weekno) {
    return this.startOf(+weekno + 1)
  }
}

export default alt.createStore(UserStore, 'UserStore')
