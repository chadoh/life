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
      requestUpdate: UserActions.requestUpdate
    })
    this.state = Map({
      user: _blankUser
    })
  }

  requestUser(slug) {
    this.setState(this.state.set('user', _blankUser))
    UserService.getUser(slug)
  }

  receiveUser(user) {
    this.setState(this.state.set('user', Map(user)))
  }

  requestUpdate({id, slug, name, born}) {
    UserService.update(arguments[0]).then(() => {
      history.pushState(null, `/${slug}`)
    })
  }

  static dateOf(weekno) {
    let born = this.getState().getIn(['user', 'born']);
    if (!born) throw Error("User has no birth date set yet!");

    let [year, month, day] = born.split('-').map(x => parseInt(x))
    born = new Date(year, month - 1, day)

    return new Date(born.getFullYear() + Math.floor(weekno/52), born.getMonth(), born.getDate() + (weekno%52)*7)
  }
}

export default alt.createStore(UserStore, 'UserStore')
