import alt from '../alt'
import { Map } from 'immutable'
import UserActions from '../actions/UserActions'
import UserService from '../services/UserService';
import RouterContainer from '../services/RouterContainer'

var _blankUser = Map({id: '', name: '', email: '', slug: '', born: ''})

class UserStore {

  constructor() {
    this.bindListeners({
      requestUser: UserActions.requestUser,
      receiveUser: UserActions.gotUser,
      requestUpdate: UserActions.requestUpdate
    })
    this.state = {
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

  requestUpdate(params) {
    UserService.update(...params).then(() => {
      var nextPath = '/' + params[1]
      RouterContainer.get().transitionTo(nextPath)
    })
  }

  static dateOf(weekno) {
    let _born = this.getState().born;
    if (!_born) throw "User has no birth date set yet!"
    return new Date(_born.getFullYear() + Math.floor(weekno/52), _born.getMonth(), _born.getDate() + (weekno%52)*7)
  }
}

export default alt.createStore(UserStore, 'UserStore')
