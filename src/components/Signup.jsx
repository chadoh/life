import React from 'react';
import ReactMixin from 'react-mixin';
import { Link } from 'react-router';
import RouterContainer from '../services/RouterContainer'

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: '',
      name: '',
      email: '',
      born: '',
      password: '',
      password_confirmation: '',
    }
  }

  componentDidMount() {
    if (!this.props.params.payment) {
      RouterContainer.get().transitionTo('/pricing')
    }
  }

  signup(e) {
    e.preventDefault();
  }

  render() {
    return (
      <form role="form" onSubmit={this.signup.bind(this)}>
        <div className="hero sunset-cliffs">
          <div className="container">
            <h2 className="brand">Signup</h2>
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
      </form>
    )
  }
}

ReactMixin(Signup.prototype, React.addons.LinkedStateMixin);
