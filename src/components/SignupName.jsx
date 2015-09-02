import React from 'react/addons';
import ReactMixin from 'react-mixin';
import RouterContainer from '../services/RouterContainer'

export default class SignupName extends React.Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
  }

  submit(e) {
    e.preventDefault()

    let path = window.location.pathname;
    let query = window.location.search;
    RouterContainer.get().transitionTo(path + query + '&name=' + encodeURIComponent(this.state.name))
  }
  render() {
    return (
      <div className="hero sunset-cliffs">
        <div className="vertical-centering container">
          <form role="form" onSubmit={this.submit.bind(this)} className="bg-tint">
            <h2 className="brand">Thanks so much!</h2>
            <p ref="error" className="text" style={{display: 'none'}}><span ref="errorMsg"/><span className="label error">oops</span></p>
            <p>
              <label htmlFor="name">Now let&lsquo;s get started. What&lsquo;s your name?</label>
              <input type="text" required className="form-control" id="name"
                autoFocus placeholder="Ahsum Yu" valueLink={this.linkState('name')}
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

ReactMixin(SignupName.prototype, React.addons.LinkedStateMixin);
