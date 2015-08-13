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
      <div className="hero sunset-cliffs">
        <div className="vertical-centering container">
          <form role="form" onSubmit={this.login.bind(this)}>
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
