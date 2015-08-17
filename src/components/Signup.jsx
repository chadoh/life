import React from 'react'
import ReactMixin from 'react-mixin'
import AuthService from '../services/AuthService'
import jwt_decode from 'jwt-decode'
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

  signup(born) {
    AuthService.signup(
      this.props.query.payment,
      this.props.query.name,
      this.props.query.email,
      this.props.query.slug,
      born
    )
    .then(function(response) {
      var jwt = response.token;
      var nextPath = '/' + jwt_decode(jwt).slug;
      RouterContainer.get().transitionTo(nextPath)
    })

    .fail(function(err) {
      alert('there was an error! :-( :-(')
      console.error(err)
    })
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
    else
      toRender = <SignupBorn onSubmit={this.signup.bind(this)}/>
    return toRender
  }
}

ReactMixin(Signup.prototype, React.addons.LinkedStateMixin);
