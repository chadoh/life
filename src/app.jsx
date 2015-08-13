import React from 'react';
import Router, {Route} from 'react-router';
import AuthenticatedApp from './components/AuthenticatedApp'
import Login from './components/Login';
import Home from './components/Home';
import User from './components/User';
import WeekDetail from './components/WeekDetail';
import UserEdit from './components/UserEdit';
import RouterContainer from './services/RouterContainer';
import LoginActions from './actions/LoginActions';

var routes = (
  <Route handler={AuthenticatedApp}>
    <Route name="login" handler={Login}/>
    <Route name="home" path="/" handler={Home}/>
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

let jwt = localStorage.getItem('jwt');
if (jwt) {
  LoginActions.loginUser(jwt);
}

router.run(function (Handler) {
  React.render(<Handler />, document.getElementById('content'));
});

