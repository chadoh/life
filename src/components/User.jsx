import React from 'react';
import ReactMixin from 'react-mixin';
import UserStore from '../stores/UserStore';
import EventStore from '../stores/EventStore';
import UserService from '../services/UserService';
import EventService from '../services/EventService';
import WholeLife from './WholeLife';
import { RouteHandler } from 'react-router';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getState();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    UserService.getUser(this.props.params.slug)
    UserStore.addChangeListener(this._onChange);

    EventService.fetchEventsForUser(this.props.params.slug);
    EventStore.addChangeListener(this._onChange);
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
    var cal = !this.state.events.get('0') ? '' : <WholeLife events={this.state.events} />
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
