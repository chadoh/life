import React from 'react'
import {Link} from 'react-router'
import Nav from './Nav'

import LoginStore from '../stores/LoginStore'
import logo from '../images/logo-white.svg'

const renderCalendarLink = () => {
  const user = LoginStore.getState().user;
  if(!user.slug) return null;
  else return (
    <span> or <Link to={user.slug}>go to your own calendar</Link></span>
  )
}

export default () => {
  return (
    <div id="top" className="hero sunset-cliffs">
      <div className="landing">
        <Nav>
          <Link to="/">
            <img src={logo} alt="Entire.Life" className="logo"/>
          </Link>
        </Nav>
        <h1 className="hero-header container">
          <div className="brand">4 0 4</div>
          <div>Not Found</div>
        </h1>
        <div className="container">
          <p className="light-links">
            You've stumbled on a page that doesn't exist.
            You can <Link to="/">visit the home page</Link>
            {renderCalendarLink()}
            .
          </p>
        </div>
        <p>No worries.</p>
      </div>
    </div>
  )
}
