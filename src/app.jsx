import React from 'react'
import Router, {Route, DefaultRoute} from 'react-router'
import AuthenticatedApp from './components/AuthenticatedApp'
import Home from './components/Home'
import Pricing from './components/Pricing'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Workit from './components/Workit'
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
    <Route name="home" path="/" handler={Home}>
      <DefaultRoute name="workit" handler={Workit}/>
      <Route name="signin" path="signin" handler={Signin}/>
    </Route>

    <Route name="signup" path="signup" handler={Signup}/>

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

router.run(function (Handler) {
  React.render(<Handler />, document.getElementById('content'));
});

