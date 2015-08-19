'use strict';

import React from 'react';
import LoginStore from '../stores/LoginStore'
import { Route, RouteHandler, Link } from 'react-router';
import AuthService from '../services/AuthService'
import RouterContainer from '../services/RouterContainer'
import PaymentForm from './PaymentForm'

export default class AuthenticatedApp extends React.Component {
  render() {
    return (
      <form action="" method="POST" className="payment">
        <div className="vertical-centering">
          <div className="payment-inner container">
            <p className="payment-errors"/>
            <p>
              <label>
                <span>Card Number</span>
                <input type="text" size="20" data-stripe="number" autoFocus/>
              </label>
            </p>

            <div className="flex-row">
              <p>
                <label>
                  <span>CVC</span>
                  <input type="text" size="4" data-stripe="cvc"/>
                </label>
              </p>

              <div/>

              <p>
                <label htmlFor="exp-month">Expiration</label>
                <span className="flex-row">
                  <input id="exp-month" type="text" size="2" data-stripe="exp-month" placeholder="MM"/>
                  <input type="text" size="4" data-stripe="exp-year" placeholder="YYYY"/>
                </span>
              </p>
            </div>

            <button type="submit">Submit Payment</button>
          </div>
        </div>
      </form>
    )
  }
}
