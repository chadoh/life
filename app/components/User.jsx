import React from 'react';
import ReactMixin from 'react-mixin';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UserStore from '../stores/UserStore';
import EventStore from '../stores/EventStore';
import UserActions from '../actions/UserActions';
import EventActions from '../actions/EventActions';
import Life from './Life';
import LifeLoading from './LifeLoading';
import Nav from './Nav';
import Joyride from 'react-joyride';
import { Link } from 'react-router';
import spoon from '../images/spoon-of-diamonds.png';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getState();
    this._onChange = this._onChange.bind(this);
    this.addSteps = this.addSteps.bind(this);
    this.addTooltip = this.addTooltip.bind(this);
    this.startTour = this.startTour.bind(this);
    this.endTour = this.endTour.bind(this);
  }

  componentDidMount() {
    UserStore.listen(this._onChange);
    EventStore.listen(this._onChange);

    UserActions.requestUser(this.props.params.slug)
    EventActions.requestEventsForUser(this.props.params.slug)
  }

  componentWillUnmount() {
    UserStore.unlisten(this._onChange);
    EventStore.unlisten(this._onChange);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.slug !== this.props.params.slug) {
      UserActions.requestUser(this.props.params.slug)
      EventActions.requestEventsForUser(this.props.params.slug)
    }
  }

  _onChange() {
    this.setState(this.getState());
  }

  getState() {
    return {
      user: UserStore.getState().get('user'),
      events: EventStore.getState().get('events'),
      steps: this.state ? (this.state.steps || []) : [],
    };
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

  addTooltip(data) {
    this.refs.joyride.addTooltip(data);
  }

  startTour(e) {
    e.preventDefault()
    this.refs.joyride.reset()
    this.refs.joyride.start(true)
  }

  endTour() {
    this.props.history.replaceState(null, this.props.location.pathname)
  }

  render() {
    var cal = !this.state.events.get('0') || !this.state.user.get('born') ?
      <LifeLoading /> : <Life events={this.state.events} addSteps={this.addSteps} showTour={this.props.location.query.tour} />

    return (
      <div className="container-wide">
        <Joyride ref="joyride" steps={this.state.steps} type="guided" locale={{back: 'Back', close: 'Close', last: 'Okay!', next: 'Next', skip: 'Skip'}}
          completeCallback={this.endTour} showSkipButton={true}
        />
        <Nav startTour={this.startTour}>
          <h1 className="brand">
            <Link to="home" className="logo-small">
              <img src={`/${spoon}`} alt="Home" />
            </Link>
            {this.state.user.get('name') + ':'} <small>A life</small>
          </h1>
        </Nav>
        {this.props.children}
        {cal}
      </div>
    );
  }
}

ReactMixin(User.prototype, PureRenderMixin);
