import React from 'react/addons'
import ReactMixin from 'react-mixin'
import PaymentService from '../services/PaymentService'
import {STRIPE_PUBLISHABLE_KEY} from '../config'

export default class PaymentForm extends React.Component {
  constructor() {
    super()
    this.state = {
      cc: '',
      exp: (new Date()).toISOString().split('-').slice(0,2).join('-'),
      cvc: ''
    }
  }

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

  submit(e) {
    e.preventDefault()
    React.findDOMNode(this.refs.button).disabled = true;
    React.findDOMNode(this.refs.error).style.display = "none";

    Stripe.setPublishableKey(STRIPE_PUBLISHABLE_KEY);
    Stripe.card.createToken({
      number: this.state.cc,
      cvc: this.state.cvc,
      exp_month: this.state.exp.split('-')[1],
      exp_year: this.state.exp.split('-')[0]
    }, this.stripeResponseHandler.bind(this))
  }

  stripeResponseHandler(status, response) {
    React.findDOMNode(this.refs.button).disabled = false;
    if (response.error) {
      React.findDOMNode(this.refs.errorMsg).innerText = response.error.message;
      React.findDOMNode(this.refs.error).style.display = "block";
    } else {
      PaymentService.charge({user_id: this.props.user.id, token: response.id})
    }
  }

  render() {
    return (
      <form onSubmit={this.submit.bind(this)} className="payment">
        <div className="vertical-centering">
          <div className="payment-inner container">
            <h2 className="brand">Thanks for signing up, {this.props.user.name}!</h2>
            <p>
              We&lsquo;ve created a calendar for you and can&lsquo;t wait to let you use it! The last thing left to do &ndash; payment!
            </p>
            <p>
              You&lsquo;ve selected the {this.props.user.payment_frequency} payment plan, so:
            </p>
            <p>
              <strong>You will be charged ${this.paymentAmount}</strong>. {this.paymentFrequency}.
            </p>
            <p ref="error" style={{display: 'none'}}><span ref="errorMsg"/><span className="label error">oops</span></p>
            <div className="cardPaymentView">
              <div className="cardNumberInput input top">
                <input valueLink={this.linkState('cc')} onFocus={this.focusParentDiv} onBlur={this.blurParentDiv} className="control" id="card_number" type="tel" x-autocompletetype="cc-number" autocompletetype="cc-number" autoCorrect="off" spellCheck="off" autoCapitalize="off" placeholder="Card number" autoFocus/>
                <div className="svg icon" style={{ width: "30px", height: "30px" }}>
                  <img src="/images/icon-credit-card.svg" alt=""/>
                </div>
              </div>
              <div className="cardExpiresInput input left bottom">
                <input valueLink={this.linkState('exp')} onFocus={this.focusParentDiv} onBlur={this.blurParentDiv} className="control" id="cc-exp" type="month" x-autocompletetype="off" autocompletetype="off" autoCorrect="off" spellCheck="off" autoCapitalize="off" placeholder="YYYY-MM"/>
                <div className="svg icon" style={{ width: "30px", height: "30px" }}>
                  <img src="/images/icon-calendar.svg" alt=""/>
                </div>
                <select id="cc-exp-year" x-autocompletetype="cc-exp-year" autocompletetype="cc-exp-year" autoCorrect="off" spellCheck="off" autoCapitalize="off" tabIndex="-1" style={{ position: "absolute", left: "-10000px" }}>
                  <option>Year</option><option value="2014">2014</option><option value="2015">2015</option><option value="2016">2016</option><option value="2017">2017</option><option value="2018">2018</option><option value="2019">2019</option><option value="2020">2020</option><option value="2021">2021</option><option value="2022">2022</option><option value="2023">2023</option><option value="2024">2024</option>
                </select>
                <select id="cc-exp-month" x-autocompletetype="cc-exp-month" autocompletetype="cc-exp-month" autoCorrect="off" spellCheck="off" autoCapitalize="off" tabIndex="-1" style={{ position: "absolute", left: "-10000px" }}>
                  <option>Month</option><option value="01">January</option><option value="02">February</option><option value="03">March</option><option value="04">April</option><option value="05">May</option><option value="06">June</option><option value="07">July</option><option value="08">August</option><option value="09">September</option><option value="10">October</option><option value="11">November</option><option value="12">December</option>
                </select>
              </div>
              <div className="cardCVCInput input right bottom">
                <input valueLink={this.linkState('cvc')} onFocus={this.focusParentDiv} onBlur={this.blurParentDiv} className="control" id="cc-csc" type="tel" autoComplete="off" autoCorrect="off" spellCheck="off" autoCapitalize="off" placeholder="CVC" maxLength="4"/>
                <div className="svg icon" style={{ width: "30px", height: "30px" }}>
                  <img src="/images/icon-lock.svg" alt=""/>
                </div>
              </div>
            </div>
            <button type="submit" ref="button">Submit Payment</button>
          </div>
        </div>
      </form>
    )
  }
}

ReactMixin(PaymentForm.prototype, React.addons.LinkedStateMixin)
