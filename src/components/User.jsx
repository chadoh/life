import React from 'react';
import ReactMixin from 'react-mixin';
import UserStore from '../stores/UserStore';
import EventStore from '../stores/EventStore';
import UserActions from '../actions/UserActions';
import EventActions from '../actions/EventActions';
import Life from './Life';
import LifeLoading from './LifeLoading';
import { RouteHandler, Link } from 'react-router';
import Title from './Title'

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getState();
    this._onChange = this._onChange.bind(this);
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
    return {user: UserStore.getState().user, events: EventStore.getState().events};
  }

  render() {
    var cal = !this.state.events.get('0') || !this.state.user.get('born') ?
      <LifeLoading /> : <Life events={this.state.events} />

    return (
      <div className="container-wide">
        <Title>
          <Link to="home" className="logo-small">
            <img src="/images/spoon-of-diamonds.png" alt="Home" />
          </Link>
          {this.state.user.get('name') + ':'} <small>A life</small>
        </Title>
        <RouteHandler/>
        {cal}
      </div>
    );
  }
}

ReactMixin(User.prototype, React.addons.PureRenderMixin);
