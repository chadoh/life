import React from 'react'
import ReactMixin from 'react-mixin'
import UserStore from '../stores/UserStore'
import LoginStore from '../stores/LoginStore'
import EventStore from '../stores/EventStore'
import Events from './Events'
import EventForm from './EventForm'
import PaymentForm from './PaymentForm'
import { Range } from 'immutable'
import { Link } from 'react-router'
import { FREE_EVENTS } from '../config'

export default class WeekDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signedInUser: LoginStore.getState().user,
      events: null,
      eventUnderEdit: null
    }
    this.updateEvents = this.updateEvents.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.editEvent = this.editEvent.bind(this)
  }

  componentWillMount() {
    EventStore.listen(this.updateEvents)
    LoginStore.listen(this.updateUser)
  }

  componentDidMount() {
    if (!this.state.events) this.updateEvents()
    document.body.className = document.body.className + ' noscroll-weekdetail'
  }

  componentWillUnmount() {
    EventStore.unlisten(this.updateEvents)
    LoginStore.unlisten(this.updateUser)
    document.body.className = document.body.className.replace(/ noscroll-weekdetail/, '')
  }

  updateEvents() {
    this.setState({events: EventStore.getState().getIn(['events', this.props.params.weekno]), eventUnderEdit: null})
  }

  updateUser() {
    this.setState({signedInUser: LoginStore.getState().user})
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
      if(this.state.signedInUser.event_count < FREE_EVENTS || this.state.signedInUser.paid === true) {
        return <EventForm weekno={this.props.params.weekno} start={this.start()}
          slug={this.props.params.slug} signedInUser={this.state.signedInUser}
          eventUnderEdit={this.state.eventUnderEdit}/>
      } else {
        return <PaymentForm user={this.state.signedInUser} />
      }
    }
  }

  render() {
    return (
      <div className="week-detail-wrap">
        <Link to={`/${this.props.params.slug}`} className="close-week-detail">close</Link>
        {!UserStore.getState().getIn(['user', 'born']) ? '' :
          <aside className="week-detail">
            <h1 className="brand">Week of {this.start().toDateString()}</h1>
            {Math.floor(+this.props.params.weekno/52)} years old
            <h2>This week in {this.whose()} life:</h2>
            <Events events={this.state.events} slug={this.props.params.slug}
              weekno={this.props.params.weekno}
              authed={this.authed()} onEdit={this.editEvent}
            />
            {this.form()}
          </aside>
        }
      </div>
    )
  }

  start() {
    return UserStore.dateOf(+this.props.params.weekno);
  }
}
