import React from 'react';
import ReactMixin from 'react-mixin';
import UserStore from '../stores/UserStore';
import EventStore from '../stores/EventStore';
import UserService from '../services/UserService';
import EventService from '../services/EventService';
import Life from './Life';
import LifeLoading from './LifeLoading';
import { RouteHandler, Link } from 'react-router';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getState();
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    UserStore.listen(this._onChange);
    EventStore.listen(this._onChange);
  }

  componentDidMount() {
    UserService.getUser(this.props.params.slug)
    EventService.fetchEventsForUser(this.props.params.slug);
  }

  componentWillUnmount() {
    UserStore.unlisten(this._onChange);
    EventStore.unlisten(this._onChange);
  }

  _onChange() {
    this.setState(this.getState());
  }

  getState() {
    return {user: UserStore.getState().user, events: EventStore.getState().events};
  }

  render() {
    var cal = !this.state.events.get('0') ? <LifeLoading /> : <Life events={this.state.events} />
    return (
      <div className="container-wide">
        <h1 className="brand">
          <Link to="home" className="logo-small">
            <img src="http://f.cl.ly/items/0j1k0u1G0i2A122N3I33/spoon-of-diamonds.png" alt="Home" />
          </Link>
          {this.state.user.get('name') + ':'} <small>A life</small>
        </h1>
        <RouteHandler/>
        {cal}
      </div>
    );
  }
}

ReactMixin(User.prototype, React.addons.PureRenderMixin);
