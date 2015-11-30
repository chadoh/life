import './vendor/picnic.min.css'
import './main.css'

import './lib/googleAuth'
import './lib/resizeSpy'

import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute} from 'react-router'
import Home from './components/Home'
import Signin from './components/Signin'
import Workit from './components/Workit'
import SigningUp from './components/SigningUp'
import User from './components/User'
import MonthDetail from './components/MonthDetail'
import WeekDetail from './components/WeekDetail'
import UserEdit from './components/UserEdit'
import LoginActions from './actions/LoginActions'
import alt from './lib/alt'
import storage from './lib/storage'
import persist from './lib/persist'
import history from './lib/history'

persist(alt, storage, 'app')

LoginActions.recordLoginFromSavedSession();

let router = (
  <Router history={history}>
    <Route path="/" component={Home}>
      <IndexRoute component={Workit}/>
      <Route path="signin" component={Signin}/>
    </Route>

    <Route path="/signing-up" component={SigningUp}/>

    <Route path="/account" component={UserEdit} />
    <Route path="/:slug" component={User}>
      <Route path="month/:monthno" component={MonthDetail}/>
      <Route path="week/:weekno" component={WeekDetail}/>
    </Route>
  </Router>
)

ReactDOM.render(router, document.getElementById('content'));
