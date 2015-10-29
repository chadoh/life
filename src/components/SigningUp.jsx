import React from 'react/addons'
import ReactMixin from 'react-mixin'
import AuthService from '../services/AuthService'
import LoginStore from '../stores/LoginStore'
import { Link } from 'react-router'
import RouterContainer from '../services/RouterContainer'
import AuthenticatedComponent from './AuthenticatedComponent';
import UserService from '../services/UserService';

class SigningUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      born: '1950-12-25',
      slug: LoginStore.getState().user.slug,
      user: LoginStore.getState().user,
      changingSlug: false
    }
    this.changeSlug = this.changeSlug.bind(this)
  }

  render() {
    return (
      <div className="hero sunset-cliffs">
        <div className="vertical-centering container">
          <form role="form" onSubmit={this.submit.bind(this)} className="bg-tint">
            <h2 className="brand">Almost done, {this.state.user.name}!</h2>
            <p ref="error" className="text" style={{display: 'none'}}><span ref="errorMsg"/><span className="label error">oops</span></p>
            <p>
              <label htmlFor="born">When were you born? This will be the first date on your calendar!</label>
              <input type="date" required className="form-control" id="born"
                autoFocus valueLink={this.linkState('born')}
                autoComplete='off'
              />
            </p>
            {this.renderSlug()}
            <button ref="button" type="submit" className="brand">Looks good !</button>
          </form>
        </div>
      </div>
    )
  }

  renderSlug() {
    return (
      <div>
        {this.state.changingSlug
          ? <div>
              <p>
                <label htmlFor="slug">Pick a URL</label>
                <input required className="form-control" id="slug"
                  autoFocus valueLink={this.linkState('slug')}
                  autoComplete='off'
                />
              </p>
              <p>
                Right now your link is "entire.life/{this.state.slug}" &ndash; is that cool?
              </p>
            </div>
          : <p><small><a href="#" onClick={this.changeSlug}>
              If you want, you can also change your URL
            </a></small></p>
        }
      </div>
    )
  }

  changeSlug(e) {
    e.preventDefault()
    this.setState({changingSlug: true})
  }

  submit(e) {
    e.preventDefault()

    React.findDOMNode(this.refs.button).disabled = true;
    React.findDOMNode(this.refs.error).style.display = "none";
    UserService.update({
      id: this.state.user.id,
      slug: this.state.slug,
      born: this.state.born,
    })
    .then(response => {
      debugger;
      const user = response.user;
      const nextPath = '/' + user.slug;
      RouterContainer.get().transitionTo(nextPath)
    })

    .fail(err => {
      React.findDOMNode(this.refs.button).disabled = false;
      React.findDOMNode(this.refs.errorMsg).innerText = this.prettyError(err.response);
      React.findDOMNode(this.refs.error).style.display = "block";
    })
  }

  prettyError(errorJson) {
    let error = JSON.parse(errorJson)
    let msg = []
    for (var key in error) {
      msg.push(key + ' ' + error[key].join(', '))
    }
    return msg.join('; ').replace(/slug/g, 'URL')
  }
}

ReactMixin(SigningUp.prototype, React.addons.LinkedStateMixin);

export default AuthenticatedComponent(SigningUp)
