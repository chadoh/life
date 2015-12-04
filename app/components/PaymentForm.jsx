import React from 'react'
import ReactMixin from 'react-mixin'
import LinkedStateMixin from 'react-addons-linked-state-mixin'
import { Link } from 'react-router'
import PaymentService from '../services/PaymentService'
import {STRIPE_PUBLISHABLE_KEY} from '../config'
import CreditCardInput from './CreditCardInput'
import calendarIcon from '../images/icon-calendar.svg'
import creditCardIcon from '../images/icon-credit-card.svg'
import lockIcon from '../images/icon-lock.svg'

export default class PaymentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      payment_frequency: null,
      cc: '',
      exp: '',
      cvc: ''
    }
    this.submit = this.submit.bind(this)
    this.paymentAmount = this.paymentAmount.bind(this)
    this.paymentFrequency = this.paymentFrequency.bind(this)
    this.setPaymentFrequency = this.setPaymentFrequency.bind(this)
  }

  focusParentDiv(e) {
    e.target.parentNode.className = e.target.parentNode.className + " focus"
  }
  blurParentDiv(e) {
    e.target.parentNode.className = e.target.parentNode.className.replace(/ focus/, '')
  }
  paymentAmount() {
    return this.state.payment_frequency === 'annual' ? "10" : "50"
  }
  paymentFrequency() {
    return this.state.payment_frequency === 'annual' ? "This charge will recur annually" : "This is a one-time charge"
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
      PaymentService.charge({
        user: this.props.user.slug,
        token: response.id,
        payment_frequency: this.state.payment_frequency,
      })
    }
  }

  _setExpAutocompleteType(component) {
    if(component) {
      component.setAttribute('x-autocompletetype', 'cc-exp')
      component.setAttribute('autocompletetype', 'cc-exp')
      component.setAttribute('autocomplete', 'cc-exp')
    }
  }

  _setCSCAutocompleteType(component) {
    if(component) {
      component.setAttribute('x-autocompletetype', 'cc-csc')
      component.setAttribute('autocompletetype', 'cc-csc')
      component.setAttribute('autocomplete', 'cc-csc')
    }
  }

  renderCreditCardFields() {
    if(this.state.payment_frequency) {
      return (
        <div>
          <p>
            Great! Thanks!
          </p>
          <p>
            <strong>So then, you will be charged ${this.paymentAmount()}</strong>. {this.paymentFrequency()}.
          </p>
          <p ref="error" style={{display: 'none'}}><span ref="errorMsg"/><span className="label error">oops</span></p>
          <div className="cardPaymentView">
            <div className="cardNumberInput input top">
              <CreditCardInput valueLink={this.linkState('cc')} onFocus={this.focusParentDiv} onBlur={this.blurParentDiv}/>
              <div className="svg icon" style={{ width: "30px", height: "30px" }}>
                <img src={creditCardIcon} alt=""/>
              </div>
            </div>
            <div className="cardExpiresInput input left bottom">
              <input valueLink={this.linkState('exp')} onFocus={this.focusParentDiv} onBlur={this.blurParentDiv} className="control" id="cc-exp" type="month" name="card_exp" ref={this._setExpAutocompleteType} autoCorrect="off" spellCheck="off" autoCapitalize="off" placeholder="YYYY-MM"/>
              <div className="svg icon" style={{ width: "30px", height: "30px" }}>
                <img src={calendarIcon} alt=""/>
              </div>
            </div>
            <div className="cardCVCInput input right bottom">
              <input valueLink={this.linkState('cvc')} onFocus={this.focusParentDiv} onBlur={this.blurParentDiv} className="control" id="cc-csc" type="tel" name="card_csc" ref={this._setCSCAutocompleteType} spellCheck="off" autoCapitalize="off" placeholder="CVC" maxLength="4"/>
              <div className="svg icon" style={{ width: "30px", height: "30px" }}>
                <img src={lockIcon} alt=""/>
              </div>
            </div>
          </div>
          <button type="submit" ref="button">Submit Payment</button>
          <br/><br/>
          <p><small>
              If neither option is affordable for you, please&nbsp;
              <a href="mailto:your+payment@entire.life">email us</a> and we'll
              work something else out.
          </small></p>
        </div>
      )
    }
  }

  setPaymentFrequency(e) {
    this.setState({payment_frequency: e.target.value})
  }

  render() {
    return (
      <form onSubmit={this.submit} className="payment">
        <h2 className={this.props.className}>We're glad you're loving Entire.Life!</h2>
        <p>We love you, too!</p>
        <p>
          As we state on <Link to="/pricing">our pricing page</Link>, we never
          want to sell your personal information to advertisers. You are not
          the product!
        </p>
        <p>We're trying to find a better way.</p>
        <p>To continue adding events, please select a payment option:</p>
        <p>
          <select onChange={this.setPaymentFrequency} value={this.state.payment_frequency}>
            <option value="">Pick one...</option>
            <option value="annual">Annual – $10 per year</option>
            <option value="lifetime">Lifetime – $50, one time</option>
          </select>
        </p>
        {this.renderCreditCardFields()}
      </form>
    )
  }
}

ReactMixin(PaymentForm.prototype, LinkedStateMixin)
