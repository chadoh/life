import React from 'react'
import LinkedStateMixin from 'react-addons-linked-state-mixin'
import ReactMixin from 'react-mixin'
import AuthService from '../services/AuthService'
import LoginStore from '../stores/LoginStore'
import { Link } from 'react-router'
import RouterContainer from '../services/RouterContainer'
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

    this.refs.button.disabled = true;
    this.refs.error.style.display = "none";
    UserService.update({
      id: this.state.user.id,
      slug: this.state.slug,
      born: this.state.born,
    })
    .then(response => {
      const user = response.user;
      const nextPath = '/' + user.slug;
      this.props.history.pushState(null, nextPath)
    })

    .fail(err => {
      this.refs.button.disabled = false;
      this.refs.errorMsg.innerText = this.prettyError(err.response);
      this.refs.error.style.display = "block";
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

ReactMixin(SigningUp.prototype, LinkedStateMixin);

export default SigningUp
