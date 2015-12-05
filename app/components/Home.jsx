import React from 'react'
import {Link} from 'react-router'

import Nav from './Nav'
import screenshots from '../images/entire.life-screenshots.png'
import logo from '../images/logo-white.png'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <div id="top" className="hero sunset-cliffs">
          <div className="landing">
            <Nav>
              <Link to="/">
                <img src={logo} alt="Entire.Life" className="logo"/>
              </Link>
              {/* put Entire.Life logo here */}
            </Nav>
            <h1 className="hero-header container">
              <div className="brand">Plan. Remember.</div>
              <div>Live a Meaningful Life.</div>
            </h1>
            <div className="container-wide">
              <p>
                Entire.Life is a symbolic life calendar that helps you
                remember the good and plan for the better.
              </p>
            </div>
            <p style={{marginTop: 0}}>
              <Link to="/signin" className="button" style={{boxShadow: '-1px 1px 8px rgba(255,255,255,0.5)'}}>
                Claim my free life calendar now
              </Link>
            </p>
            <div className="devices-photo">
              <img src={screenshots} alt="Entire.Life works on all devices"/>
            </div>
          </div>
        </div>
        <div className="bg-dark">
          <div className="container">
            <small>
              Entire.Life thanks Tim Urban at&nbsp;
              <a href="http://waitbutwhy.com/2014/05/life-weeks.html">Wait But Why</a>,&nbsp;
              for inventing the idea of the life calendar, and&nbsp;
              <a href="http://brittanyforks.com/life/">Brittany Forks</a>, who
              first put emojis on one.
            </small>
          </div>
        </div>
      </div>
    )
  }
}
