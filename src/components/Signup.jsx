import React from 'react'
import ReactMixin from 'react-mixin'
import Pricing from './Pricing'
import SignupName from './SignupName'
import SignupEmail from './SignupEmail'
import SignupSlug from './SignupSlug'
import SignupBorn from './SignupBorn'
import { Link } from 'react-router'
import RouterContainer from '../services/RouterContainer'

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
  }

  signup(e) {
    e.preventDefault();
  }

  render() {
    let toRender;
    if (!this.props.query.payment)
      toRender = <Pricing/>
    else if (!this.props.query.name)
      toRender = <SignupName/>
    else if (!this.props.query.email)
      toRender = <SignupEmail name={this.props.query.name}/>
    else if (!this.props.query.slug)
      toRender = <SignupSlug email={this.props.query.email}/>
    else if (!this.props.query.born)
      toRender = <SignupBorn/>
    else {
      toRender = <form role="form" onSubmit={this.signup.bind(this)}>
        <div className="hero sunset-cliffs">
          <div className="container">
            <h1 className="brand">Signup</h1>
          </div>
        </div>
      </form>
    }
    return toRender
  }
}

ReactMixin(Signup.prototype, React.addons.LinkedStateMixin);
