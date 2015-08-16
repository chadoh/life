import React from 'react/addons';
import ReactMixin from 'react-mixin';
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

    let path = window.location.pathname;
    let query = window.location.search;
    RouterContainer.get().transitionTo(path + query + '&email=' + this.state.email)
  }
  render() {
    return (
      <div className="hero sunset-cliffs">
        <div className="vertical-centering container">
          <form role="form" onSubmit={this.submit.bind(this)} className="bg-tint">
            <h2 className="brand">Nice to meet you, {this.props.name}!</h2>
            <p ref="error" className="text" style={{display: 'none'}}><span ref="errorMsg"/><span className="label error">oops</span></p>
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
