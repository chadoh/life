import React from 'react/addons';
import ReactMixin from 'react-mixin';
import RouterContainer from '../services/RouterContainer'

export default class SignupBorn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      born: '1950-12-25'
    }
  }

  submit(e) {
    e.preventDefault()

    let path = window.location.pathname;
    let query = window.location.search;
    RouterContainer.get().transitionTo(path + query + '&born=' + this.state.born)
  }
  render() {
    return (
      <div className="hero sunset-cliffs">
        <div className="vertical-centering container">
          <form role="form" onSubmit={this.submit.bind(this)} className="bg-tint">
            <h2 className="brand">Okay, one last thing</h2>
            <p ref="error" className="text" style={{display: 'none'}}><span ref="errorMsg"/><span className="label error">oops</span></p>
            <p>
              <label htmlFor="born">When were you born? This will be the first date on your calendar!</label>
              <input type="date" required className="form-control" id="born"
                autoFocus valueLink={this.linkState('born')}
                autoComplete='off'
              />
            </p>
            <button type="submit" className="brand">Sign up!</button>
          </form>
        </div>
      </div>
    );
  }
}

ReactMixin(SignupBorn.prototype, React.addons.LinkedStateMixin);
