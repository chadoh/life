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
  }

  componentDidMount() {
    UserStore.listen(this._onChange);
    EventStore.listen(this._onChange);
    this.maybeFetchNewUser(this.state.user.get('slug'))
  }

  componentWillUnmount() {
    UserStore.unlisten(this._onChange);
    EventStore.unlisten(this._onChange);
  }

  componentDidUpdate(prevProps) {
    this.maybeFetchNewUser(prevProps.params.slug)
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

  maybeFetchNewUser(slug) {
    if (slug !== this.props.params.slug) {
      UserActions.requestUser(this.props.params.slug)
      EventActions.requestEventsForUser(this.props.params.slug)
    }
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

  render() {
    var cal = !this.state.events.get('0') || !this.state.user.get('born') ?
      <LifeLoading /> : <Life events={this.state.events} addSteps={this.addSteps} />

    return (
      <div className="container-wide">
        <Joyride ref="joyride" steps={this.state.steps} type="guided" locale={{back: 'Back', close: 'Close', last: 'Done', next: 'Next', skip: 'Skip'}} />
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
