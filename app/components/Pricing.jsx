import React from 'react';
import Nav from './Nav';
import { FREE_EVENTS } from '../config';
import LoginStore from '../stores/LoginStore'
import connectToStores from 'alt/utils/connectToStores';
import { Link } from 'react-router'

@connectToStores
export default class Pricing extends React.Component {
  static getStores() {
    return [LoginStore];
  }

  static getPropsFromStores() {
    return LoginStore.getState().user;
  }

  renderPayNow() {
    if(this.props.id && !this.props.paid)
      return (
        <div>
          <hr/>
          <h2 className="brand">Want to pay now?</h2>
          <p>
            If you like Entire.Life and know that you want to continue past
            your {FREE_EVENTS} free events, you can <Link to="/payment">pay
            now</Link>.
          </p>
        </div>
      )
  }

  render() {
    return (
      <div>
        <div className="container-wide">
          <Nav/>
        </div>
        <div id="top" className="hero sunset-cliffs">
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
                We'll let you get started with your life calendar for free. You
                can start visualizing and planning your life, and
                add <strong>{FREE_EVENTS}</strong> events on our dime.
              </p>
              <p>
                After that, we believe you'll find it valuable enough to pay a
                small amount for it.
              </p>
              <p>Your options:</p>
              <dl>
                <dt className="brand"><h3>Annual</h3></dt>
                <dd>$10 per year. Three fancy coffee drinks cost more!</dd>

                <dt className="brand"><h3>Lifetime</h3></dt>
                <dd>$50, one time. No need to worry about future payments.</dd>
              </dl>
              <p>
                These seem like very reasonable prices to us, by American
                standards. However, we understand that they might still seem high
                for some people. If you want a life calendar, but can't afford to
                pay, <a href="mailto:your+homepage@entire.life">email us</a> and
                we'll work something out.
              </p>
              {this.renderPayNow()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
