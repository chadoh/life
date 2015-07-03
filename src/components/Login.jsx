import React from 'react/addons';
import ReactMixin from 'react-mixin';
import Auth from '../services/AuthService'

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
    Auth.login(this.state.email, this.state.password)
      .catch(function(err) {
        alert("There was an error logging in");
        console.log("Error logging in", err);
      });
  }

  render() {
    return (
      <div className="login jumbotron center-block">
        <h1>Login</h1>
        <form role="form" onSubmit={this.login.bind(this)}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" valueLink={this.linkState('email')} className="form-control" id="email" placeholder="Email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" valueLink={this.linkState('password')} className="form-control" id="password" ref="password" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    </div>
    );
  }
}

ReactMixin(Login.prototype, React.addons.LinkedStateMixin);
