import alt from '../alt'
import { Map } from 'immutable'
import UserActions from '../actions/UserActions'

class UserStore {

  constructor() {
    this.bindListeners({
      receiveUser: UserActions.gotUser
    })
    this.state = {
      // user: Map({id: 1, name: "Chad Ostrowski", email: "hi@chadoh.com", slug: "chadoh", born: "1987-03-14"}),
      user: Map({id: '', name: '', email: '', slug: '', born: ''}),
      born: null
    }
  }

  receiveUser(user) {
    this.setState({user: Map(user), born: new Date(user.born.split('-'))})
  }

  static dateOf(weekno) {
    let _born = this.getState().born;
    if (!_born) return new Date();
    return new Date(_born.getFullYear() + Math.floor(weekno/52), _born.getMonth(), _born.getDate() + (weekno%52)*7)
  }
}

export default alt.createStore(UserStore, 'UserStore')
