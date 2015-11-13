import './vendor/picnic.min.css'
import './main.css'

import React from 'react'
import Router, {Route, DefaultRoute} from 'react-router'
import AuthenticatedApp from './components/AuthenticatedApp'
import Home from './components/Home'
import Signin from './components/Signin'
import SigningUp from './components/SigningUp'
import Workit from './components/Workit'
import User from './components/User'
import WeekDetail from './components/WeekDetail'
import UserEdit from './components/UserEdit'
import RouterContainer from './services/RouterContainer'
import LoginActions from './actions/LoginActions'
import alt from './lib/alt'
import storage from './lib/storage'
import persist from './lib/persist'

persist(alt, storage, 'app')

LoginActions.recordLoginFromSavedSession();

var routes = (
  <Route handler={AuthenticatedApp}>
    <Route name="home" path="/" handler={Home}>
      <DefaultRoute name="workit" handler={Workit}/>
      <Route name="signin" path="signin" handler={Signin}/>
    </Route>

    <Route name="signing-up" path="/signing-up" handler={SigningUp}/>

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
