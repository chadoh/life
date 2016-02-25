import React from 'react'
import {Link} from 'react-router'

import Nav from './Nav'
import logo from '../images/logo-black.svg'
import Footer from './Footer'

export default () => {
  return (
    <div>
      <div className="hero sunset-cliffs">
        <Nav>
          <Link to="/">
            <img src={logo} alt="Entire.Life" className="logo" style={{paddingTop: '0.5em'}}/>
          </Link>
          <h1 className="brand">
            Press
          </h1>
        </Nav>
        {/* content goes here */}
      </div>
      <Footer/>
    </div>
  )
}
