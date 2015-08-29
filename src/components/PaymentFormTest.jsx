import React from 'react'
import PaymentForm from './PaymentForm'
import { Link } from 'react-router'

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
        </div>
        <PaymentForm user={{name: "Test User", payment_frequency: "annual"}}/>
      </div>
    )
  }
}
