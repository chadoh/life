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
  }

  componentDidMount() {
    UserStore.listen(this._onChange);
    EventStore.listen(this._onChange);
    this.maybeFetchNewUser(this.state.user.get('slug'))
    this.addSteps([{
      title: 'Welcome to the world!',
      text: 'This baby emoji represents the week you were born. Once this tour is over, you can mouse over it to see the date.',
      selector: '.year:first-child a:first-child',
      position: 'bottom',
    }, {
      title: 'Your first year',
      text: 'Each row represents one year of your life. For this whole first row, you were 0 years old, just... squirming & watching & learning.',
      selector: '.year:first-child',
      position: 'bottom',
    }, {
      title: 'One hundred trips around the sun!',
      text: "You can make it to 100 years old, right? It'll be awesome!",
      selector: '.year:last-child a:first-child',
      position: 'top',
    }], true)
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

  render() {
    var cal = !this.state.events.get('0') || !this.state.user.get('born') ?
      <LifeLoading /> : <Life events={this.state.events} />

    return (
      <div className="container-wide">
        <Joyride ref="joyride" steps={this.state.steps} debug={true} type="guided" />
        <Nav>
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
