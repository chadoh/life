import React from 'react/addons'
import ReactMixin from 'react-mixin'
import { Link } from 'react-router';
import AuthService from '../services/AuthService'
import RouterContainer from '../services/RouterContainer'

export default class SignupEmail extends React.Component {
  constructor() {
    super()
    this.state = {
      email: ''
    }
  }

  submit(e) {
    e.preventDefault()

    React.findDOMNode(this.refs.error).style.display = "none"
    AuthService.checkEmail(this.state.email)
    .then(() => {
      let path = window.location.pathname;
      let query = window.location.search;
      RouterContainer.get().transitionTo(path + query + '&email=' + encodeURIComponent(this.state.email))
    })
    .fail(() => {
      React.findDOMNode(this.refs.error).style.display = "block"
    })

  }
  render() {
    return (
      <div className="hero sunset-cliffs">
        <div className="vertical-centering container">
          <form role="form" onSubmit={this.submit.bind(this)} className="bg-tint">
            <h2 className="brand">Nice to meet you, {this.props.name}!</h2>
            <div className="text" ref="error" style={{display: 'none'}}>
              <p>That email address has already been taken! 😔 </p>
              <p>Did you sign up already? You can <Link to="login">sign in!</Link></p>
              <p>
                If you don't remember ever setting a password, search your
                email for a link to confirm your account! If you're still
                having trouble, please <a href="mailto:your@entire.life">email us</a>
                &nbsp;for help!
              </p>
            </div>
            <p>
              <label htmlFor="email">We&lsquo;ll need your email address. This is how you&lsquo;ll sign in!</label>
              <input type="email" required className="form-control" id="email"
                autoFocus placeholder="awesome@you.com" valueLink={this.linkState('email')}
                autoComplete='off'
              />
            </p>
            <button type="submit" className="brand">Continue &rarr;</button>
          </form>
        </div>
      </div>
    );
  }
}

ReactMixin(SignupEmail.prototype, React.addons.LinkedStateMixin);
