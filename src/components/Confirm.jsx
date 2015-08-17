import React from 'react';
import ReactMixin from 'react-mixin';
import jwt_decode from 'jwt-decode'
import RouterContainer from '../services/RouterContainer'
import ConfirmationService from '../services/ConfirmationService'

export default class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      password_confirmation: '',
    };

  }

  componentDidMount() {
    ConfirmationService.fetchUserFrom(this.props.query.confirmation_token)
    .then(response => {
      this.setState({
        name: response.user.name,
        email: response.user.email
      })
      React.findDOMNode(this.refs.details).style.visibility = "visible"
    }.bind(this))
    .fail(err => {
      React.findDOMNode(this.refs.error).style.display = "block"
      React.findDOMNode(this.refs.form).style.display = "none"
    })
  }

  confirm(e) {
    e.preventDefault();
    // post to /users/confirmation
    ConfirmationService.confirm(
      this.props.query.confirmation_token,
      this.state.password,
      this.state.password_confirmation
    )
    .then(function(response) {
      var jwt = response.token;
      var nextPath = '/' + jwt_decode(jwt).slug;
      RouterContainer.get().transitionTo(nextPath)
    })
    .fail(err => {
      let rawMsg = JSON.parse(err.response)
      let errorMsg = []
      for (var key in rawMsg) {
        errorMsg.push(key + ' ' + rawMsg[key])
      }
      React.findDOMNode(this.refs.errorMsg).innerText = errorMsg.join(', ')
      React.findDOMNode(this.refs.passwordError).style.display = "block";
    })
  }

  render() {
    return (
      <div className="hero vertical-centering sunset-cliffs">
        <div className="container bg-tint">
          <div ref="error" style={{display: 'none'}}>
            <h2 className="brand">Link Expired!</h2>
            <p className="text">
              Uh oh! You may have tried clicking a link in an old confirmation
              email that we sent you. Maybe you already confirmed your account!
              In any case, this page won't help you. If this is causing
              problems, please <a href="mailto:hi+entire.life@chadoh.com">email us</a>.
            </p>
          </div>

          <form ref="form" role="form" onSubmit={this.confirm.bind(this)}>
            <div ref="details" style={{visibility: 'hidden'}}>
              <h2 className="brand">Welcome back {this.state.name}!</h2>
              <p className="text">Now you just need to set a password!</p>
              <div ref="passwordError" className="text" style={{display: 'none'}}>
                <p>There were errors<span className="label error">oops</span></p>
                <p ref="errorMsg"/>
              </div>
              <p>
                <label htmlFor="email">Email (you set this before &ndash; it&lsquo;s is how you&lsquo;ll sign in)</label>
                <input type="email" value={this.state.email} id="email" ref="email" disabled/>
              </p>
            </div>
            <p>
              <label htmlFor="password">Password</label>
              <input type="password" valueLink={this.linkState('password')} id="password" autoFocus/>
            </p>
            <p>
              <label htmlFor="password_confirmation">Confirm Password</label>
              <input type="password" valueLink={this.linkState('password_confirmation')} id="password_confirmation" />
            </p>
            <button type="submit" className="brand">Confirm</button>
          </form>
        </div>
      </div>
    )
  }
}

ReactMixin(UserEdit.prototype, React.addons.LinkedStateMixin);
