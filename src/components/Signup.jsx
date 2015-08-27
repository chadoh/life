import React from 'react'
import ReactMixin from 'react-mixin'
import AuthService from '../services/AuthService'
import jwt_decode from 'jwt-decode'
import Pricing from './Pricing'
import SignupName from './SignupName'
import SignupEmail from './SignupEmail'
import SignupSlug from './SignupSlug'
import { Link } from 'react-router'
import RouterContainer from '../services/RouterContainer'

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      born: '1950-12-25'
    }
  }

  submit(e) {
    e.preventDefault()

    React.findDOMNode(this.refs.button).disabled = true;
    AuthService.signup(
      this.props.query.payment,
      this.props.query.name,
      this.props.query.email,
      this.props.query.slug,
      this.state.born
    )
    .then(function(response) {
      var jwt = response.token;
      var nextPath = '/' + jwt_decode(jwt).slug;
      RouterContainer.get().transitionTo(nextPath)
    })

    .fail(function(err) {
      React.findDOMNode(this.refs.button).disabled = false;
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
      toRender = (
        <div className="hero sunset-cliffs">
          <div className="vertical-centering container">
            <form role="form" onSubmit={this.submit.bind(this)} className="bg-tint">
              <h2 className="brand">Okay, one last thing</h2>
              <p ref="error" className="text" style={{display: 'none'}}><span ref="errorMsg"/><span className="label error">oops</span></p>
              <p>
                <label htmlFor="born">When were you born? This will be the first date on your calendar!</label>
                <input type="date" required className="form-control" id="born"
                  autoFocus valueLink={this.linkState('born')}
                  autoComplete='off'
                />
              </p>
              <button ref="button" type="submit" className="brand">Sign up!</button>
            </form>
          </div>
        </div>
      )

    return toRender
  }
}

ReactMixin(Signup.prototype, React.addons.LinkedStateMixin);
