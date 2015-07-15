import React from 'react';
import ReactMixin from 'react-mixin';
import UserStore from '../stores/UserStore';
import EventStore from '../stores/EventStore';
import UserService from '../services/UserService';
import EventService from '../services/EventService';
import Life from './Life';
import LifeLoading from './LifeLoading';
import { RouteHandler } from 'react-router';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getState();
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    UserStore.addChangeListener(this._onChange);
    EventStore.addChangeListener(this._onChange);
  }

  componentDidMount() {
    UserService.getUser(this.props.params.slug)
    EventService.fetchEventsForUser(this.props.params.slug);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
    EventStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(this.getState());
  }

  getState() {
    return {user: UserStore.user, events: EventStore.events};
  }

  render() {
    var cal = !this.state.events.get('0') ? <LifeLoading /> : <Life events={this.state.events} />
    return (
      <div>
        <h1>{this.state.user.get('name')} <small>A life</small></h1>
        <RouteHandler/>
        {cal}
      </div>
    );
  }
}

ReactMixin(User.prototype, React.addons.PureRenderMixin);
