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
import { Link } from 'react-router';
import spoon from '../images/spoon-of-diamonds.png';
import UserTour from './UserTour';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getState();
    this._onChange = this._onChange.bind(this);
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
      events: EventStore.getState().get('events')
    };
  }

  maybeFetchNewUser(slug) {
    if (slug !== this.props.params.slug) {
      UserActions.requestUser(this.props.params.slug)
      EventActions.requestEventsForUser(this.props.params.slug)
    }
  }

  render() {
    var cal = !this.state.events.get('0') || !this.state.user.get('born') ?
      <LifeLoading /> : <Life events={this.state.events} />

    return (
      <div>
        <div className="container-wide">
          <Nav>
            <h1 className="brand">
              <Link to="/" className="logo-small" ref="whatever">
                <img src={`/${spoon}`} alt="Home" />
              </Link>
              {this.state.user.get('name') + ':'} <small>A life</small>
            </h1>
          </Nav>
          {this.props.children}
          {cal}
        </div>
      </div>
    );
  }
}

ReactMixin(User.prototype, PureRenderMixin);
