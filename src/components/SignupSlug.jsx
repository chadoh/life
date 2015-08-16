import React from 'react/addons';
import ReactMixin from 'react-mixin';
import RouterContainer from '../services/RouterContainer'

export default class SignupSlug extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      slug: props.email.split('@')[0]
    }
  }

  submit(e) {
    e.preventDefault()

    let path = window.location.pathname;
    let query = window.location.search;
    RouterContainer.get().transitionTo(path + query + '&slug=' + this.state.slug)
  }
  render() {
    return (
      <div className="hero sunset-cliffs">
        <div className="vertical-centering container">
          <form role="form" onSubmit={this.submit.bind(this)} className="bg-tint">
            <h2 className="brand">Awesome. We&lsquo;re almost done!</h2>
            <p ref="error" className="text" style={{display: 'none'}}><span ref="errorMsg"/><span className="label error">oops</span></p>
            <p>
              <label htmlFor="slug">When you send people a link to your calendar, how would you like it to look?</label>
              <input type="text" required className="form-control" id="slug"
                autoFocus valueLink={this.linkState('slug')}
                autoComplete='off'
              />
            </p>
            <p className="text">
              Right now it looks like "entire.life/{this.state.slug}" &ndash; is that cool?
            </p>
            <button type="submit" className="brand">Yes, continue &rarr;</button>
          </form>
        </div>
      </div>
    );
  }
}

ReactMixin(SignupSlug.prototype, React.addons.LinkedStateMixin);
