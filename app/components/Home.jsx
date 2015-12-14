import React from 'react'
import {Link} from 'react-router'

import Nav from './Nav'
import screenshots from '../images/entire.life-screenshots.png'
import logo from '../images/logo-white.svg'
import plotPoints from '../images/example-plot-points.png'
import payOffDebt from '../images/example-pay-off-debt.png'
import spoon from '../images/spoon.png'

import thisWeekPresent from '../images/home-this-week-present.png'
import thisWeekDrab from '../images/home-this-week-drab.png'
import pastWeeks from '../images/home-past-weeks.png'
import eventAddExample from '../images/home-event-add-example.png'
import pastCalendarExample from '../images/home-past-calendar-example.png'
import pastAndFuture from '../images/home-past-and-future.png'
import expiredPlan from '../images/home-expired-plan.png'
import socialSecurity from '../images/home-social-security.png'

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
              <div className="col-sm-4 centered">
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
            <div className="row reverse">
              <div className="col-sm-4 centered">
                <img src={payOffDebt} className="circle" alt="a goal to pay of student loans by a date that's now in the past, with buttons to mark complete, snooze, or delete it"/>
              </div>
              <div className="col-sm-8">
                <h2 className="brand">Plan Ahead</h2>
                <p>
                  Add plans for next week, next year, or even your hundredth
                  birthday! Once the date of a plan has passed by, you can mark
                  it as completed, snooze it until next week, or just forget
                  all about it.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4 centered">
                <img src={spoon} alt="a spoon"/>
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
          <div className="rounded-images">
            <div className="container">
              <h2 className="brand" id="how-it-works">How it works</h2>
              <p>Most websites and apps keep us focused on <em>right now</em>, or maybe <em>this week</em>:</p>
              <div className="centered">
                <img style={{width: 207}} src={thisWeekPresent} alt="a gift, labelled This week! The present!"/>
              </div>
              <p>There's nothing wrong with the present! It's a great place to be. But without context, the present can start to feel sorta drab:</p>
              <div className="centered">
                <img style={{width: 198}} src={thisWeekDrab} alt="a plain white box, labelled This week, I guess..."/>
              </div>
              <p>That's because, no matter how awesome our lives look from far away, our actual day-in, day-out activities can often seem like a monotonous slog.</p>
            </div>

            <div className="container">
              <h3 className="brand">So let's look from farther away</h3>
              <p>Entire.Life doesn't just give you the present. It also gives you your entire past, back to the day you were born.</p>
            </div>
            <div className="centered">
              <img style={{width: 454}} src={pastWeeks} alt="a row of dots, fading out to the left, with This Week! The Present! on the far right"/>
            </div>
            <div className="container">
              <p>And instead of just adding thoughts and events about the present, you can add events for any of your past weeks.</p>
            </div>
            <div className="centered">
              <img style={{width: 320}} src={eventAddExample} alt="Entire.Life event creation form, with the event Made My First Sale being added"/>
            </div>
            <div className="container">
              <p>With all of that historic context, the present can start to feel like a gift again. We can remember how hard we worked to get where we're at, and spot plot arcs and foreshadowing that give us a sense of purpose.</p>
            </div>
            <div className="centered">
              <img style={{width: 320}} src={pastCalendarExample} alt="Entire.Life calendar filled in, with different romantic events showing"/>
            </div>

            <div className="container">
              <h3 className="brand">But that's not all</h3>
              <p>Entire.Life also shows your whole unwritten future.</p>
            </div>
            <div className="centered">
              <img style={{width: 464}} src={pastAndFuture} alt="a row dark dots, fading out to the left, with This Week! The Present! in the middle, and then light dots after, fading out to the right"/>
            </div>
            <div className="container">
              <p>You can add plans to any future date. Once the date passes by, you can mark it as complete, snooze until next week, or forget about it forever.</p>
            </div>
            <div className="centered">
              <img style={{width: 320}} src={expiredPlan} alt="a Finish Writing Book plan now in the past, with options to mark done, snooze, or delete"/>
            </div>
            <div className="container">
              <p>But you can even add farther-future events.</p>
            </div>
            <div className="centered">
              <img style={{width: 320}} src={socialSecurity} alt="Entire.Life's week detail view showing a plan: Eligible For Social Security"/>
            </div>
            <div className="container">
              <p>Just as reflecting on the past can give us a sense of gratitude, reflecting on the future can give us a sense of urgency. </p>

              <h3 className="brand">The Forest &amp; The Branches</h3>
              <p>It's easy to get stuck in the monotonous slog of the present.</p>
              <p>It's easy to lose awareness, and to let each week slip by without thought.</p>
              <p>It's easy to stop being intentional about how we live our lives.</p>
              <p>Most likely, all the other websites and apps that you use today will only increase your tendency to lose context. They'll keep you focused on a view of the branches right around you.</p>
              <p>Entire.Life will lift you above it all, and show you a view of the whole forest. The whole, beautiful forest of your life.</p>
              <p>
                <Link to="/signin" className="button">
                  Claim my free life calendar now
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="bg-light">
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
