import alt from '../alt';
import RouterContainer from '../services/RouterContainer'

class LoginActions {
  loginUser(jwt) {
    var savedJwt = localStorage.getItem('jwt')

    if (savedJwt !== jwt) {
      var nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/'

      RouterContainer.get().transitionTo(nextPath)
      localStorage.setItem('jwt', jwt)
    }

    this.dispatch(jwt)
  }

  logoutUser() {
    RouterContainer.get().transitionTo('/login')
    localStorage.removeItem('jwt')
    this.dispatch()
  }
}

export default alt.createActions(LoginActions)
