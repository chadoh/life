import alt from '../alt';
import RouterContainer from '../services/RouterContainer'
import jwt_decode from 'jwt-decode'

class LoginActions {
  loginUser(jwt) {
    var savedJwt = localStorage.getItem('jwt')

    if (savedJwt !== jwt) {
      var nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/' + jwt_decode(jwt).slug

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
