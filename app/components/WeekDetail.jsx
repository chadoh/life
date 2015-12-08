import React from 'react'
import UserStore from '../stores/UserStore'
import LoginStore from '../stores/LoginStore'
import EventStore from '../stores/EventStore'
import Events from './Events'
import EventForm from './EventForm'
import PaymentForm from './PaymentForm'
import { FREE_EVENTS } from '../config'
import connectToStores from 'alt/utils/connectToStores';

@connectToStores
export default class WeekDetail extends React.Component {
  static getStores() {
    return [EventStore, LoginStore];
  }

  static getPropsFromStores(transition) {
    return {
      events: EventStore.getState().get('events'),
      signedInUser: LoginStore.getState().user,
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      eventUnderEdit: null,
    }
    this.editEvent = this.editEvent.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.params.weekno !== nextProps.params.weekno || // navigated to different week
      this.props.params.slug !== nextProps.params.slug || // navigated to different user (not sure if possible)
      this.props.events !== nextProps.events || // updated an event
      (!this.props.signedInUser && this.props.signedInUser) || // user logged in
      (this.props.signedInUser && !this.props.signedInUser) || // user logged out
      (this.props.signedInUser && nextProps.signedInUser && // current user's event count changed
        this.props.signedInUser.event_count !== nextProps.signedInUser.event_count) ||
      nextState.eventUnderEdit
  }

  componentDidUpdate() {
    this.setState({eventUnderEdit: null})
  }

  authed() {
    return LoginStore.canEdit(UserStore.getState().get('user'))
  }

  editEvent(event) {
    this.setState({eventUnderEdit: event})
  }

  whose() {
    if(this.authed()) return "your";
    else
      return `${UserStore.getState().getIn(['user', 'name']).split(' ')[0]}'s`
  }

  form() {
    if(this.authed()) {
      if(this.props.signedInUser.event_count < FREE_EVENTS || this.props.signedInUser.paid === true) {
        return <EventForm weekno={+this.props.params.weekno} start={this.start()}
          slug={this.props.params.slug} signedInUser={this.props.signedInUser}
          eventUnderEdit={this.state.eventUnderEdit}
        />
      } else {
        return <PaymentForm user={this.props.signedInUser} />
      }
    }
  }

  render() {
    if(UserStore.getState().getIn(['user', 'born'])) {
      return (
        <div ref="container" className="container-wide detail-inner">
          <header>
            <h2 className="brand">Week of {this.start().toDateString()}</h2>
            <span className="age">{`${Math.floor(+this.props.params.weekno/52)} years old`}</span>
          </header>
          <div className={this.authed() ? "two-col" : ""}>
            <div>
              <h3>This week in {this.whose()} life:</h3>
              <Events events={this.props.events.get(this.props.params.weekno)}
                slug={this.props.params.slug} weekno={+this.props.params.weekno}
                authed={this.authed()} onEdit={this.editEvent}
              />
            </div>
            <div>
              {this.form()}
            </div>
          </div>
        </div>
      )
    }
  }

  start() {
    return UserStore.startOf(+this.props.params.weekno);
  }
}
