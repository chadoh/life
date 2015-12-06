import React from 'react'
import {Link} from 'react-router'

import Nav from './Nav'
import screenshots from '../images/entire.life-screenshots.png'
import logo from '../images/logo-white.svg'
import plotPoints from '../images/example-plot-points.png'
import payOffDebt from '../images/example-pay-off-debt.png'
import spoon from '../images/spoon.png'

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
        <div className="bg-light">
          <div className="container">
            <div className="row">
              <div className="col-sm-4">
                <img src={plotPoints} className="circle" alt="section of a life calendar showing ages 20 to 30, with a kissy emoji and a bride emoji showing"/>
              </div>
              <div className="col-sm-8">
                <h2 className="brand">Track Meaning</h2>
                <p>
                  Your life tells a story. Use Entire.Life to track the plot
                  twists that have lead to where you are. You can add as little
                  or as much detail as you want—even using Entire.Life as a
                  journal!
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-8">
                <h2 className="brand">Plan Ahead</h2>
                <p>
                  Add plans for next week, next year, or even your hundredth
                  birthday! Once the date of a plan has passed by, you can mark
                  it as completed, snooze it until next week, or just forget
                  all about it.
                </p>
              </div>
              <div className="col-sm-4">
                <img src={payOffDebt} className="circle" alt="a goal to pay of student loans by a date that's now in the past, with buttons to mark complete, snooze, or delete it"/>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <img src={spoon} className="circle" alt="a spoon"/>
              </div>
              <div className="col-sm-8">
                <h2 className="brand">Stay Motivated</h2>
                <p>
                  If you had a diamond for each week of your life, the whole
                  lot of them would fill one spoonful. Entire.Life helps keep
                  you in a zoomed-out view of your life. It's natural to feel
                  some angst about that at first, but once we get past our fear
                  of being tiny, seeing our diamonds for how vanishing and
                  finite they are can help to motivate and free us.
                </p>
              </div>
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
