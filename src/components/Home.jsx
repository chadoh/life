import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent'
import { Link } from 'react-router';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="hero sunset-cliffs">
          <div className="vertical-centering">
            <div>
              <h1 className="brand">
                <small>Your</small><br />
                Precious Spoonful<br />
                <small>of</small> Diamonds
              </h1>
            </div>
          </div>
          <div className="trailing">
            <img src="http://f.cl.ly/items/0j1k0u1G0i2A122N3I33/spoon-of-diamonds.png" className="logo" alt="logo: a spoonful of diamonds" />
          </div>
        </div>
        <div className="bg-dark">
          <div className="container">
            <p>If you had a diamond for every week you&lsquo;ve ever or will ever live,</p>
            <h2 style={{margin: "2em 0"}}>your life would fill one heaping tablespoon.<sup><a href="#thanks">*</a></sup></h2>
            <p>That&lsquo;s it! That&lsquo;s all any of us get.</p>
            <p>Are you making the most of them?</p>
          </div>
        </div>

        <div className="bg-light">
          <div className="container">
            <h1 className="brand">We want to help you live intentionally!</h1>
            <p>We&lsquo;re making tools to help you visualize and plan your life. To find out when it&lsquo;s ready, sign up!</p>
            <div id="mc_embed_signup">
              <form action="//publishist.us7.list-manage.com/subscribe/post?u=82eccb779d56c1434d98c79cf&amp;id=2354043ebd" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
                <div id="mc_embed_signup_scroll">
                  <p className="mc-field-group">
                    <label htmlFor="mce-EMAIL">Email Address </label>
                    <input type="email" name="EMAIL" required id="mce-EMAIL"/>
                  </p>
                  <p className="mc-field-group">
                    <label htmlFor="mce-FNAME">First Name </label>
                    <input type="text" name="FNAME" id="mce-FNAME"/>
                  </p>
                  <p className="mc-field-group">
                    <label htmlFor="mce-LNAME">Last Name </label>
                    <input type="text" name="LNAME" id="mce-LNAME"/>
                  </p>
                  <p id="mce-responses" className="clear">
                    <div className="response" id="mce-error-response" style={{display: 'none'}}></div>
                    <div className="response" id="mce-success-response" style={{display: 'none'}}></div>
                  </p>
                  <div style={{position: 'absolute', left: -5000}}><input type="text" name="b_82eccb779d56c1434d98c79cf_2354043ebd" tabIndex="-1" defaultValue=""/></div>
                  <div className="clear"><input type="submit" defaultValue="Sign Up" name="subscribe" id="mc-embedded-subscribe"/></div>
                </div>
              </form>
            </div>
          </div>
        </div>


        <div className="bg-dark">
          <div className="container">
            <h1 className="brand">How about some examples?</h1>
            <p>
              Our core product is a <em>Life Calendar</em>. You can use it to
              quickly get a view of every week of your life. All the weeks
              you&lsquo;ve already lived, and all the weeks upcoming. It gives
              a beautiful portrait of all you&lsquo;ve done, allows setting
              goals for the future, and gives a poignant, motivating reminder
              of the transience of life.
            </p>
            <p>Here are some examples of other people&lsquo;s calendars:</p>
            <ul>
              <li><Link to="user" params={{slug: "chadoh"}}>Chad Ostrowski</Link>, the creator of this website</li>
              <li>Marie Curie, famous physicist &ndash; <span className="brand">Coming Soon</span></li>
              <li>Albert Einstein, famous physicist &ndash; <span className="brand">Coming Soon</span></li>
              <li>Amelia Earhart, the long-lost aviator &ndash; <span className="brand">Coming Soon</span></li>
            </ul>
          </div>
        </div>

        <div className="bg-light full-height">
          <div className="container">
            <h1 className="brand" id="thanks">With Great Thanks To</h1>
            <p>
              The spoon imagery and concept of a &ldquo;life in weeks&rdquo; calendar come
              from <a href="http://waitbutwhy.com/2014/05/life-weeks.html">Wait
                But Why</a>, a fantastic blog.
            </p>
            <p>
              Inspiration for digitizing such a calendar comes from <a
                href="http://busterbenson.com">Buster Benson</a>.
            </p>
            <p>
              Design inspiration, and the idea to incorporate emojis into the
              calendar, comes from <a
                href="http://brittanyforks.com/life/">Brittany Forks</a>.
            </p>
          </div>
        </div>

      </div>
    )
  }
}
