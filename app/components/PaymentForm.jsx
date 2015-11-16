import React from 'react/addons'
import ReactMixin from 'react-mixin'
import LinkedStateMixin from 'react-addons-linked-state-mixin'
import PaymentService from '../services/PaymentService'
import {STRIPE_PUBLISHABLE_KEY} from '../config'
import CreditCardInput from './CreditCardInput'

export default class PaymentForm extends React.Component {
  constructor() {
    super()
    this.state = {
      cc: '',
      exp: '',
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
    this.refs.button.disabled = true;
    this.refs.error.style.display = "none";

    Stripe.setPublishableKey(STRIPE_PUBLISHABLE_KEY);
    Stripe.card.createToken({
      number: this.state.cc,
      cvc: this.state.cvc,
      exp_month: this.state.exp.split('-')[1],
      exp_year: this.state.exp.split('-')[0]
    }, this.stripeResponseHandler.bind(this))
  }

  stripeResponseHandler(status, response) {
    if (response.error) {
      this.refs.errorMsg.innerText = response.error.message;
      this.refs.error.style.display = "block";
      this.refs.button.disabled = false;
    } else {
      PaymentService.charge(this.props.user.slug, response.id)
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
                <CreditCardInput valueLink={this.linkState('cc')} onFocus={this.focusParentDiv} onBlur={this.blurParentDiv}/>
                <div className="svg icon" style={{ width: "30px", height: "30px" }}>
                  <img src="/images/icon-credit-card.svg" alt=""/>
                </div>
              </div>
              <div className="cardExpiresInput input left bottom">
                <input valueLink={this.linkState('exp')} onFocus={this.focusParentDiv} onBlur={this.blurParentDiv} className="control" id="cc-exp" type="month" name="card_exp" ref={this._setExpAutocompleteType} autoCorrect="off" spellCheck="off" autoCapitalize="off" placeholder="YYYY-MM"/>
                <div className="svg icon" style={{ width: "30px", height: "30px" }}>
                  <img src="/images/icon-calendar.svg" alt=""/>
                </div>
              </div>
              <div className="cardCVCInput input right bottom">
                <input valueLink={this.linkState('cvc')} onFocus={this.focusParentDiv} onBlur={this.blurParentDiv} className="control" id="cc-csc" type="tel" name="card_csc" ref={this._setCSCAutocompleteType} spellCheck="off" autoCapitalize="off" placeholder="CVC" maxLength="4"/>
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

  _setExpAutocompleteType(component) {
    let element = component.getDOMNode()
    element.setAttribute('x-autocompletetype', 'cc-exp')
    element.setAttribute('autocompletetype', 'cc-exp')
    element.setAttribute('autocomplete', 'cc-exp')
  }

  _setCSCAutocompleteType(component) {
    let element = component.getDOMNode()
    element.setAttribute('x-autocompletetype', 'cc-csc')
    element.setAttribute('autocompletetype', 'cc-csc')
    element.setAttribute('autocomplete', 'cc-csc')
  }
}

ReactMixin(PaymentForm.prototype, LinkedStateMixin)
