import React from 'react/addons';
import ReactMixin from 'react-mixin';
import jwt_decode from 'jwt-decode'
import AuthService from '../services/AuthService'
import RouterContainer from '../services/RouterContainer'

export default class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    };
  }

  login(e) {
    e.preventDefault();
    React.findDOMNode(this.refs.error).style.display = "none";

    AuthService.login(this.state.email, this.state.password)
      .then(function(response) {
        var jwt = response.token;
        var nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/' + jwt_decode(jwt).slug;
        RouterContainer.get().transitionTo(nextPath)
      })

      .fail(function(err) {
        React.findDOMNode(this.refs.errorMsg).innerText = JSON.parse(err.response).error;
        React.findDOMNode(this.refs.error).style.display = "block";
      }.bind(this))
  }

  render() {
    return (
      <div className="hero sunset-cliffs">
        <div className="vertical-centering container">
          <form role="form" onSubmit={this.login.bind(this)}>
            <p ref="error" className="error" style={{display: 'none'}}><span ref="errorMsg"/><span className="label error">oops</span></p>
            <p>
              <label htmlFor="email" className="brand">Email</label>
              <input type="email" required valueLink={this.linkState('email')} className="form-control" id="email" autofocus />
            </p>
            <p>
              <label htmlFor="password" className="brand">Password</label>
              <input type="password" required valueLink={this.linkState('password')} className="form-control" id="password" ref="password" />
            </p>
            <button type="submit" className="brand">Sign In</button>
          </form>
        </div>
      </div>
    );
  }
}

ReactMixin(Login.prototype, React.addons.LinkedStateMixin);
