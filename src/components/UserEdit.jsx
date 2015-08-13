import React from 'react';
import ReactMixin from 'react-mixin';
import UserStore from '../stores/UserStore';
import LoginStore from '../stores/LoginStore';
import UserActions from '../actions/UserActions';
import AuthenticatedComponent from './AuthenticatedComponent';
import { RouteHandler, Link } from 'react-router';

class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getState();
  }

  getState() {
    let user = LoginStore.getState().user;
    return {
      slug: user.slug,
      name: user.name,
      email: user.email,
      born: user.born,
      password: '',
      password_confirmation: '',
    };
  }

  update(e) {
    e.preventDefault();
    // TODO: create UserEvents.requestUpdate
    UserEvents.requestUpdate(
      this.state.slug,
      this.state.name,
      this.state.email,
      this.state.born,
      this.state.password,
      this.state.password_confirmation
    )
  }

  render() {
    return (
      <form role="form" onSubmit={this.update.bind(this)}>
        <div className="hero sunset-cliffs">
          <div className="container">
            <div>
              <h2 className="brand">Edit Account Details</h2>
              <p>
                <label htmlFor="slug">Username (entire.life/{this.state.slug})</label>
                <input type="text" required valueLink={this.linkState('slug')} className="form-control" id="slug" autofocus />
              </p>
              <p>
                <label htmlFor="name">Name</label>
                <input type="name" required valueLink={this.linkState('name')} className="form-control" id="name" />
              </p>
              <p>
                <label htmlFor="email">Email</label>
                <input type="email" required valueLink={this.linkState('email')} className="form-control" id="email" />
              </p>
              <p>
                <label htmlFor="born">Birth Date</label>
                <input type="date" required valueLink={this.linkState('born')} className="form-control" id="born" />
              </p>
              <button type="submit" className="brand">Save Changes</button>

              <hr />

              <p>
                <label htmlFor="password">New Password</label>
                <input type="password" valueLink={this.linkState('password')} className="form-control" id="password" ref="password" />
              </p>
              <p>
                <label htmlFor="password_confirmation">Confirm New Password</label>
                <input type="password" valueLink={this.linkState('password_confirmation')} className="form-control" id="password_confirmation" ref="password" />
              </p>
              <button type="submit" className="brand">Save Changes</button>
            </div>
          </div>
        </div>
        <div className="container">
        </div>
      </form>
    )
  }
}

ReactMixin(UserEdit.prototype, React.addons.LinkedStateMixin);

export default AuthenticatedComponent(UserEdit)

