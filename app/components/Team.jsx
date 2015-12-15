import React from 'react'
import {Link} from 'react-router'

import Nav from './Nav'
import logo from '../images/logo-white.svg'
import Footer from './Footer'

export default () => {
  return (
    <div>
      <div className="hero sunset-cliffs">
        <Nav>
          <Link to="/">
            <img src={logo} alt="Entire.Life" className="logo"/>
          </Link>
        </Nav>
        <div className="container pad-top">
          <div className="row bg-tint vertically-centered">
            <div className="col-sm-4 centered">
              <img src="https://secure.gravatar.com/avatar/259469ed60f945161a150e79a381b26c?s=500" className="circle" alt="picture of Chad Ostrowski"/>
            </div>
            <div className="col-sm-8">
              <h2 className="brand">Chad Ostrowski</h2>
              Chad built this thing. He currently lives in Philadelphia, PA, USA. What he wants to give others:
              <ul>
                <li>Wonder</li>
                <li>Perspective</li>
                <li>Power</li>
              </ul>
              <span><a href="https://www.instagram.com/_chadoh_/">Instagram</a> | <a href="http://chadoh.com/">Blog</a> | <a href="https://twitter.com/chadoh">Twitter</a> | <a href="https://entire.life/chadoh">Entire.Life</a></span>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
