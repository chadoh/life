import React from 'react';
import ReactMixin from 'react-mixin';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UserStore from '../stores/UserStore';
import LoginStore from '../stores/LoginStore';
import EventStore from '../stores/EventStore';
import UserActions from '../actions/UserActions';
import EventActions from '../actions/EventActions';
import Life from './Life';
import LifeLoading from './LifeLoading';
import Nav from './Nav';
import Joyride from 'react-joyride';
import { Link } from 'react-router';
import spoon from '../images/spoon-of-diamonds.png';
import spinner from '../images/icon-loading-spinner.gif';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getState();
    this._onChange = this._onChange.bind(this);
    this.addSteps = this.addSteps.bind(this);
    this.addTooltip = this.addTooltip.bind(this);
    this.startTour = this.startTour.bind(this);
    this.endTour = this.endTour.bind(this);
    this.renderCalendar = this.renderCalendar.bind(this);
    this.renderName = this.renderName.bind(this);
  }

  componentDidMount() {
    UserStore.listen(this._onChange);
    EventStore.listen(this._onChange);

    // transitioning to this route after sign in occurs through dispatcher
    // need to delay this call to avoid errors
    // does Redux avoid this crap?
    setTimeout(() => {
      UserActions.requestUser(this.props.params.slug)
      EventActions.requestEventsForUser(this.props.params.slug)
    }, 20)
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
    if(e) e.preventDefault();
    this.refs.joyride.reset()
    this.refs.joyride.start(true)
  }

  endTour() {
    this.props.history.replaceState(null, this.props.location.pathname)
  }

  renderCalendar() {
    const user = this.state.user;
    if(!LoginStore.canView(user)) {
      const name = this.state.user.get('name').split(' ')[0]
      return <div className="life">
        <p>There are things we're not meant to know. Amongst them, the detail's of {name}'s life!</p>
        <p>If this is your calendar, <Link to="/signin">sign in again</Link> to see it.</p>
      </div>
    } else if(!this.state.events.get('0') || !this.state.user.get('born')) {
      return <LifeLoading />
    } else {
      return (
        <Life events={this.state.events} addSteps={this.addSteps}
          startTour={this.startTour}
          showTour={this.props.location.query.tour} />
      )
    }
  }

  renderName() {
    if(this.state.user) {
      if(!LoginStore.canView(this.state.user)) {
        const name = this.state.user.get('name').split(' ')[0]
        return `${name}'s life is ${name}'s business!`
      } else {
        return <span>{this.state.user.get('name')}: <small>A life</small></span>
      }
    } else {
      return <img src={`/${spinner}`} alt="loading" style={{height: '3rem', verticalAlign: 'bottom'}}/>
    }
  }

  render() {
    return (
      <div className="container-wide">
        <Joyride ref="joyride" steps={this.state.steps} type="guided"
          locale={{back: 'Back', close: 'Close', last: 'Okay!', next: 'Next', skip: 'Skip'}}
          completeCallback={this.endTour} showSkipButton={true}
        />
        <Nav startTour={this.startTour}>
          <h1 className="brand">
            <Link to="home" className="logo-small">
              <img src={`/${spoon}`} alt="Home" />
            </Link>
            {this.renderName()}
          </h1>
        </Nav>
        {this.props.children}
        {this.renderCalendar()}
      </div>
    );
  }
}

ReactMixin(User.prototype, PureRenderMixin);
