import React from 'react';
import { Link } from 'react-router';

export default class Pricing extends React.Component {
  render() {
    return (
      <div>
        <div className="bg-light full-height">
          <div className="container">
            <h1 className="brand">
              <Link to="home" className="logo-small">
                <img src="/images/spoon-of-diamonds.png" alt="Home" />
              </Link>
              &nbsp;Choose your payment plan <sup><a href="#addendum">*</a></sup>
            </h1>
            <div className="payment-options">
              <Link to="signup" query={{payment: 'annual'}} className="payment-option">
                <h2 className="brand">
                  <div className="vertical-centering">
                    <div>
                      Annual
                    </div>
                  </div>
                </h2>
                <div className="price">
                  <sup className="currency-marker">$</sup>
                  <span className="amount">10</span>
                  <div className="interval">each year</div>
                </div>
              </Link>
              <Link to="signup" query={{payment: 'lifetime'}} className="payment-option">
                <h2 className="brand">
                  <div className="vertical-centering">
                    <div>
                      Lifetime
                    </div>
                  </div>
                </h2>
                <div className="price">
                  <sup className="currency-marker">$</sup>
                  <span className="amount">50</span>
                  <div className="interval">one-time fee</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-dark full-height">
          <div className="container">
            <h1 className="brand" id="addendum">Ads suck !</h1>
            <p>
              Entire.Life will never advertise or sell your information to third parties.
              Instead, we&lsquo;re asking you to pay what we think is a reasonable amount for our service.
            </p>
            <p>
              If the amounts we&lsquo;re charging seem too high, please&nbsp;
              <a href="mailto:your@entire.life">email us</a> to see if we
              can work out a deal.
            </p>
            <p>
              If you&lsquo;re the tech-savvy type, you can also&nbsp;
              <a href="https://github.com/chadoh/life">host your own!</a>&nbsp;
              Entire.Life is open source software, which means that you can read
              all of the code that makes it, as well as modify it and run it on
              your own servers. <strong>Note:</strong> if you choose to host
              your own, you will not have the super-cool domain name
              "entire.life", and you will miss out on future social features.
            </p>
          </div>
        </div>
      </div>
    )
  }
}
