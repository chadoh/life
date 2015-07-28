import alt from '../alt'
import { Map } from 'immutable'
import UserActions from '../actions/UserActions'
import UserService from '../services/UserService';

var _blankUser = Map({id: '', name: '', email: '', slug: '', born: ''})

class UserStore {

  constructor() {
    this.bindListeners({
      requestUser: UserActions.requestUser,
      receiveUser: UserActions.gotUser
    })
    this.state = {
      // user: Map({id: 1, name: "Chad Ostrowski", email: "hi@chadoh.com", slug: "chadoh", born: "1987-03-14"}),
      user: _blankUser,
      born: null
    }
  }

  requestUser(slug) {
    this.setState({user: _blankUser, born: null})
    UserService.getUser(slug)
  }

  receiveUser(user) {
    let [year, month, day] = user.born.split('-').map(x => parseInt(x))
    month = month - 1;
    this.setState({
      user: Map(user),
      born: new Date(year, month, day)
    })
  }

  static dateOf(weekno) {
    let _born = this.getState().born;
    if (!_born) return new Date();
    return new Date(_born.getFullYear() + Math.floor(weekno/52), _born.getMonth(), _born.getDate() + (weekno%52)*7)
  }
}

export default alt.createStore(UserStore, 'UserStore')
