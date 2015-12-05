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
            <div className="container">
              <p>
                Entire.Life is a symbolic life calendar that helps you
                remember the good and plan for the best.
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
        <div className="bg-light">
          <div className="container">
            <h2 className="brand">Credits</h2>
            <p>Entire.Life would not exist without these awesome people:</p>
            <ul id="draft_check_box_list_0">
              <li>Tim Urban at <a href="http://waitbutwhy.com/2014/05/life-weeks.html">Wait But Why</a>, who came up with the whole idea in the first place</li>
              <li><a href="http://brittanyforks.com/life/">Brittany Forks</a>, who came up with the idea to use an emoji for each event, and who largely inspired the design of Entire.Life</li>
              <li><a href="http://busterbenson.com/">Buster Benson</a>, for being the first person I know of to digitize such a Life In Weeks calendar</li>
            </ul>
            <p>We all want to see you make the most of your diamonds.</p>
            <h1 className="brand"><a href="#top">Go for it →</a></h1>
          </div>
        </div>
      </div>
    )
  }
}
