import React from 'react'
import {Link} from 'react-router'

import Nav from './Nav'
import logo from '../images/logo-white.svg'

export default class Pricing extends React.Component {
  render() {
    return (
      <div>
        <div id="top" className="hero sunset-cliffs">
          <Nav>
            <Link to="/">
              <img src={logo} alt="Entire.Life" className="logo"/>
            </Link>
          </Nav>
          <div className="container pad-top">
            <div className="bg-tint light-links">
              <h1 className="brand">Your life is not for sale</h1>
              <p>
                A life calendar is a fantastic way to remember and plan your
                life. It ends up holding all sorts of personal information.
                We <em>could</em> sell that personal information to advertisers,
                and deliver targeted ads to you.
              </p>
              <p>But we hate that.</p>
              <p>So we're hoping to find a better way.</p>
              <p>
                The base calendar functionality is provided for free.
              </p>
              <p>
                At some point, we will offer social media integrations and
                add-ons. These will cost some small amount of money per-year.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
