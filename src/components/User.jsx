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
    if (!this.state.user.id) {
      UserService.getUser(this.props.params.slug)
      EventService.fetchEventsForUser(this.props.params.slug)
    }

    UserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(this.getState());
  }

  getState() {
    return {user: UserStore.user};
  }

  render() {
    var cal = !this.state.user.get('born') ? '' :
      <WholeLife />
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
