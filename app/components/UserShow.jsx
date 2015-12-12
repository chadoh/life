import React from 'react';
import { Link } from 'react-router';
import ReactMixin from 'react-mixin';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Joyride from 'react-joyride';

import LoginStore from '../stores/LoginStore';
import Life from './Life';
import Loading from './Loading';
import Nav from './Nav';

import history from '../lib/history'
import { tourCallbacks } from '../lib/tourSteps';

import logo from '../images/logo-a-life.svg';
import spinner from '../images/icon-loading-spinner.gif';

export default class UserShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      steps: []
    }

    this.addSteps = this.addSteps.bind(this);
    this.startTour = this.startTour.bind(this);
    this.endTour = this.endTour.bind(this);
    this.renderCalendar = this.renderCalendar.bind(this);
    this.renderName = this.renderName.bind(this);
    this.stepCallback = this.stepCallback.bind(this);
  }

  addSteps(steps, start) {
    if (!Array.isArray(steps)) steps = [steps];
    if (!steps.length) return false;

    let joyride = this.refs.joyride;

    this.setState(currentState => {
      currentState.steps = currentState.steps.concat(joyride.parseSteps(steps));
      return currentState;
    }, () => {
      if (start) joyride.start();
    });
  }

  startTour(e) {
    if(e) e.preventDefault();
    this.refs.joyride.reset()
    this.refs.joyride.start(true)
  }

  endTour() {
    history.replaceState(null, this.props.location.pathname)
  }

  renderCalendar() {
    const user = this.props.user;
    if(!LoginStore.canView(user)) {
      const name = user.get('name').split(' ')[0]
      return <div className="container-wide">
        <p>There are things we're not meant to know. Amongst them, the detail's of {name}'s life!</p>
        <p>If this is your calendar, <Link to="/signin">sign in again</Link> to see it.</p>
      </div>
    } else if(!this.props.events.get('0') || !this.props.user.get('born')) {
      return <Loading/>
    } else {
      return (
        <Life events={this.props.events} addSteps={this.addSteps}
          startTour={this.startTour} slug={this.props.user.get('slug')}
          showTour={!!this.props.location.query.tour}
          detail={this.props.detail} weekno={this.props.weekno}
          monthno={this.props.monthno}
        />
      )
    }
  }

  renderName() {
    if(this.props.user) {
      if(!LoginStore.canView(this.props.user)) {
        const name = this.props.user.get('name').split(' ')[0]
        return `${name}'s life is ${name}'s business!`
      } else {
        return <span>{this.props.user.get('name')}</span>
      }
    } else {
      return <img src={spinner} alt="loading" style={{height: '3rem', verticalAlign: 'bottom'}}/>
    }
  }

  stepCallback(step) {
    if(tourCallbacks[step.selector]) {
      tourCallbacks[step.selector](this.props.user);
    }
  }

  render() {
    return (
      <div>
        <div className="container-wide">
          <Joyride ref="joyride" steps={this.state.steps} type="guided"
            locale={{back: 'Back', close: 'Close', last: 'Okay!', next: 'Next', skip: 'Skip'}}
            completeCallback={this.endTour} showSkipButton={true} stepCallback={this.stepCallback}
          />
          <Nav startTour={this.startTour}>
            <Link to="/" className="logo-small">
              <img src={logo} alt="a life" />
            </Link>
            <h1 className="brand">
              {this.renderName()}
            </h1>
          </Nav>
        </div>
        {this.renderCalendar()}
      </div>
    );
  }
}

import customPropTypes from '../lib/customPropTypes'

UserShow.propTypes = {
  weekno: React.PropTypes.string,
  monthno: React.PropTypes.string,
  user: customPropTypes.requiredMap,
  events: customPropTypes.requiredMap,
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
    query: React.PropTypes.object.isRequired,
  }).isRequired,
  detail: React.PropTypes.element,
}

ReactMixin(UserShow.prototype, PureRenderMixin);
