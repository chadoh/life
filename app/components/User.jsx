import React from 'react'
import { Link } from 'react-router'
import ReactMixin from 'react-mixin'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import UserStore from '../stores/UserStore'
import EventStore from '../stores/EventStore'
import UserActions from '../actions/UserActions'
import EventActions from '../actions/EventActions'
import UserShow from './UserShow'
import NotFound from './NotFound'

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getState();
    this._onChange = this._onChange.bind(this);
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

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.params.slug !== this.props.params.slug) {
      UserActions.requestUser(this.props.params.slug)
      EventActions.requestEventsForUser(this.props.params.slug)
    }
    if(this.state !== prevState) {
      if(!this.state.user.get('slug')) this.setState({notFound: true})
      else this.setState({notFound: false})
    }
  }

  _onChange() {
    this.setState(this.getState());
  }

  getState() {
    return {
      user: UserStore.getState().get('user'),
      events: EventStore.getState().get('events'),
      notFound: this.state ? (this.state.notFound || false) : false,
    };
  }

  render() {
    if(this.state.notFound) return <NotFound/>;
    else return (
      <UserShow user={this.state.user} events={this.state.events}
        weekno={this.props.params.weekno} monthno={this.props.params.monthno}
        detail={this.props.children} location={this.props.location}
      />
    )
  }
}

ReactMixin(User.prototype, PureRenderMixin);
