import React from 'react'
import LoginStore from '../stores/LoginStore'
import PaymentForm from './PaymentForm'
import Nav from './Nav'
import connectToStores from 'alt/utils/connectToStores';
import { Link } from 'react-router'

@connectToStores
export default class Payment extends React.Component {
  static getStores() {
    return [LoginStore];
  }

  static getPropsFromStores() {
    return LoginStore.getState().user;
  }

  componentDidMount() {
    if(!this.props.id) {
      this.props.history.replaceState(null, "/")
    }
  }

  renderPayment() {
    if(this.props.paid) {
      return (
        <div>
          <h2 className="brand">All paid!</h2>
          <p>
            Thanks so much! Enjoy <Link to={this.props.slug}>your calendar</Link>!
          </p>
        </div>
      )
    } else {
      return <PaymentForm user={this.props} className="brand"/>
    }
  }

  render() {
    return (
      <div>
        <div className="container-wide">
          <Nav/>
        </div>
        <div id="top" className="hero sunset-cliffs">
          <div className="container pad-top">
            <div className="bg-tint">
              {this.renderPayment()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
