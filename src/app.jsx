import React from 'react'
import Router, {Route} from 'react-router'
import AuthenticatedApp from './components/AuthenticatedApp'
import Login from './components/Login'
import Home from './components/Home'
import Pricing from './components/Pricing'
import Confirm from './components/Confirm'
import Signup from './components/Signup'
import User from './components/User'
import WeekDetail from './components/WeekDetail'
import UserEdit from './components/UserEdit'
import PaymentFormTest from './components/PaymentFormTest'
import RouterContainer from './services/RouterContainer'
import LoginActions from './actions/LoginActions'
import jQuery from 'jquery'

window.jQuery = jQuery;
window.$ = jQuery;

var routes = (
  <Route handler={AuthenticatedApp}>
    <Route name="login" handler={Login}/>
    <Route name="home" path="/" handler={Home}/>

    <Route name="signup" path="signup" handler={Signup}/>
    <Route name="confirm" path="users/confirmation" handler={Confirm}/>

    <Route name="payment-form-test" path="payment-form-test" handler={PaymentFormTest}/>card_number

    <Route name="account" path="/account" handler={UserEdit} />
    <Route name="user" path="/:slug" handler={User} ignoreScrollBehavior={true}>
      <Route name="week" path="week/:weekno" handler={WeekDetail} ignoreScrollBehavior={true}/>
    </Route>
  </Route>
);

var router = Router.create({
  routes: routes,
  location: Router.HistoryLocation
});
RouterContainer.set(router);

// LoginActions.loginUserFromSavedSession()

LoginActions.getProfile()

router.run(function (Handler) {
  React.render(<Handler />, document.getElementById('content'));
});
