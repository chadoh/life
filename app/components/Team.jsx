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
            Team
          </h1>
        </Nav>
        <div className="container pad-top">
          <div className="row bg-tint vertically-centered">
            <div className="col-sm-4 centered">
              <img src="https://secure.gravatar.com/avatar/259469ed60f945161a150e79a381b26c?s=400" className="circle" alt="picture of Chad Ostrowski"/>
            </div>
            <div className="col-sm-8">
              <h2 className="brand">Chad Ostrowski</h2>
              Chad builds this thing. He currently lives in Philadelphia, PA, USA. What he wants to give others:
              <ul>
                <li>Wonder</li>
                <li>Perspective</li>
                <li>Power</li>
              </ul>
              <span><a href="https://www.instagram.com/_chadoh_/">Instagram</a> | <a href="http://chadoh.com/">Blog</a> | <a href="https://twitter.com/chadoh">Twitter</a> | <a href="https://entire.life/chadoh">Entire.Life</a></span>
            </div>
          </div>
          <div className="row reverse bg-tint vertically-centered" style={{marginTop: 30}}>
            <div className="col-sm-4 centered">
              <img src="https://pbs.twimg.com/profile_images/433481660672139264/w1o6dzLj.jpeg" className="circle" alt="picture of Uri Pierre-Noel"/>
            </div>
            <div className="col-sm-8">
              <h2 className="brand">Uri Pierre Noel</h2>
              Uri markets this thing. He currently lives in Boston, MA, USA. What he wants to give to others:
              <ul>
                <li>Happiness</li>
                <li>Beauty</li>
                <li>Inspiration</li>
              </ul>
              <span><a href="https://www.instagram.com/upierrenoel/">Instagram</a> | <a href="http://upierrenoel.tumblr.com/">Blog</a> | <a href="https://twitter.com/upierrenoel">Twitter</a> | <a href="https://entire.life/upierrenoel">Entire.Life</a></span>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
