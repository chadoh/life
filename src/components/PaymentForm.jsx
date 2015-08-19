'use strict';

import React from 'react';
import LoginStore from '../stores/LoginStore'
import { Route, RouteHandler, Link } from 'react-router';
import AuthService from '../services/AuthService'
import RouterContainer from '../services/RouterContainer'
import PaymentForm from './PaymentForm'

export default class AuthenticatedApp extends React.Component {
  focusParentDiv(e) {
    e.target.parentNode.className = e.target.parentNode.className + " focus"
  }
  blurParentDiv(e) {
    e.target.parentNode.className = e.target.parentNode.className.replace(/ focus/, '')
  }
  get paymentAmount() {
    return this.props.user.payment_frequency === 'annual' ? "10" : "50"
  }
  get paymentFrequency() {
    return this.props.user.payment_frequency === 'annual' ? "This charge will recur annually" : "This is a one-time charge"
  }
  render() {
    return (
      <form action="" method="POST" className="payment">
        <div className="vertical-centering">
          <div className="payment-inner container">
            <h2 className="brand">Thanks for signing up!</h2>
            <p>
              We&lsquo;ve created a calendar for you and can&lsquo;t wait to let you use it! The last thing left to do &ndash; payment!
            </p>
            <p>
              You&lsquo;ve selected the {this.props.user.payment_frequency} payment plan, so:
            </p>
            <p>
              <strong>You will be charged ${this.paymentAmount}</strong>. {this.paymentFrequency}.
            </p>
            <p className="payment-errors"/>
            <div className="cardPaymentView">
              <div className="cardNumberInput input top">
                <input onFocus={this.focusParentDiv} onBlur={this.blurParentDiv} className="control" id="card_number" type="tel" x-autocompletetype="cc-number" autocompletetype="cc-number" autoCorrect="off" spellCheck="off" autoCapitalize="off" placeholder="Card number" autoFocus/>
                <div className="svg icon" style={{ width: "30px", height: "30px" }}>
                  <svg version="1.1" viewBox="0 0 30 30" width="30" height="30" focusable="false"><g fill-rule="evenodd"><path d="M2.00585866,0 C0.898053512,0 0,0.900176167 0,1.99201702 L0,9.00798298 C0,10.1081436 0.897060126,11 2.00585866,11 L11.9941413,11 C13.1019465,11 14,10.0998238 14,9.00798298 L14,1.99201702 C14,0.891856397 13.1029399,0 11.9941413,0 L2.00585866,0 Z M2.00247329,1 C1.44882258,1 1,1.4463114 1,1.99754465 L1,9.00245535 C1,9.55338405 1.45576096,10 2.00247329,10 L11.9975267,10 C12.5511774,10 13,9.5536886 13,9.00245535 L13,1.99754465 C13,1.44661595 12.544239,1 11.9975267,1 L2.00247329,1 Z M1,3 L1,5 L13,5 L13,3 L1,3 Z M11,8 L11,9 L12,9 L12,8 L11,8 Z M9,8 L9,9 L10,9 L10,8 L9,8 Z M9,8" style={{ fill: "#559a28" }} transform="translate(8,10)"></path></g></svg>
                </div>
              </div>
              <div className="cardExpiresInput input left bottom">
                <input onFocus={this.focusParentDiv} onBlur={this.blurParentDiv} className="control" id="cc-exp" type="text" x-autocompletetype="off" autocompletetype="off" autoCorrect="off" spellCheck="off" autoCapitalize="off" placeholder="MM / YY"/>
                <div className="svg icon" style={{ width: "30px", height: "30px" }}>
                  <svg version="1.1" viewBox="0 0 30 30" width="30" height="30" focusable="false"><g fill-rule="evenodd"><path d="M2.0085302,1 C0.899249601,1 0,1.90017617 0,2.99201702 L0,10.007983 C0,11.1081436 0.901950359,12 2.0085302,12 L9.9914698,12 C11.1007504,12 12,11.0998238 12,10.007983 L12,2.99201702 C12,1.8918564 11.0980496,1 9.9914698,1 L2.0085302,1 Z M1.99539757,4 C1.44565467,4 1,4.43788135 1,5.00292933 L1,9.99707067 C1,10.5509732 1.4556644,11 1.99539757,11 L10.0046024,11 C10.5543453,11 11,10.5621186 11,9.99707067 L11,5.00292933 C11,4.44902676 10.5443356,4 10.0046024,4 L1.99539757,4 Z M3,1 L3,2 L4,2 L4,1 L3,1 Z M8,1 L8,2 L9,2 L9,1 L8,1 Z M3,0 L3,1 L4,1 L4,0 L3,0 Z M8,0 L8,1 L9,1 L9,0 L8,0 Z M8,0" style={{ fill: "#559a28" }} transform="translate(8,9)"></path></g></svg>
                </div>
                <select id="cc-exp-year" x-autocompletetype="cc-exp-year" autocompletetype="cc-exp-year" autoCorrect="off" spellCheck="off" autoCapitalize="off" tabIndex="-1" style={{ position: "absolute", left: "-10000px" }}>
                  <option>Year</option><option value="2014">2014</option><option value="2015">2015</option><option value="2016">2016</option><option value="2017">2017</option><option value="2018">2018</option><option value="2019">2019</option><option value="2020">2020</option><option value="2021">2021</option><option value="2022">2022</option><option value="2023">2023</option><option value="2024">2024</option>
                </select>
                <select id="cc-exp-month" x-autocompletetype="cc-exp-month" autocompletetype="cc-exp-month" autoCorrect="off" spellCheck="off" autoCapitalize="off" tabIndex="-1" style={{ position: "absolute", left: "-10000px" }}>
                  <option>Month</option><option value="01">January</option><option value="02">February</option><option value="03">March</option><option value="04">April</option><option value="05">May</option><option value="06">June</option><option value="07">July</option><option value="08">August</option><option value="09">September</option><option value="10">October</option><option value="11">November</option><option value="12">December</option>
                </select>
              </div>
              <div className="cardCVCInput input right bottom">
                <input onFocus={this.focusParentDiv} onBlur={this.blurParentDiv} className="control" id="cc-csc" type="tel" autoComplete="off" autoCorrect="off" spellCheck="off" autoCapitalize="off" placeholder="CVC" maxLength="4"/>
                <div className="svg icon" style={{ width: "30px", height: "30px" }}>
                  <svg version="1.1" viewBox="0 0 30 30" width="30" height="30" focusable="false"><g fill-rule="evenodd"><path d="M8.8,4 C8.8,1.79086089 7.76640339,4.18628304e-07 5.5,0 C3.23359661,-4.1480896e-07 2.2,1.79086089 2.2,4 L3.2,4 C3.2,2.34314567 3.81102123,0.999999681 5.5,1 C7.18897877,1.00000032 7.80000001,2.34314567 7.80000001,4 L8.8,4 Z M1.99201702,4 C0.891856397,4 0,4.88670635 0,5.99810135 L0,10.0018986 C0,11.1054196 0.900176167,12 1.99201702,12 L9.00798298,12 C10.1081436,12 11,11.1132936 11,10.0018986 L11,5.99810135 C11,4.89458045 10.0998238,4 9.00798298,4 L1.99201702,4 Z M1.99754465,5 C1.44661595,5 1,5.45097518 1,5.99077797 L1,10.009222 C1,10.5564136 1.4463114,11 1.99754465,11 L9.00245535,11 C9.55338405,11 10,10.5490248 10,10.009222 L10,5.99077797 C10,5.44358641 9.5536886,5 9.00245535,5 L1.99754465,5 Z M1.99754465,5" style={{ fill: "#559a28" }} transform="translate(9,9)"></path></g></svg>
                </div>
              </div>
            </div>
            <button type="submit">Submit Payment</button>
          </div>
        </div>
      </form>
    )
  }
}
