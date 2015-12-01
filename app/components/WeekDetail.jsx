import React from 'react'
import ReactMixin from 'react-mixin'
import UserStore from '../stores/UserStore'
import LoginStore from '../stores/LoginStore'
import EventStore from '../stores/EventStore'
import Events from './Events'
import EventForm from './EventForm'
import { Range } from 'immutable'
import { Link } from 'react-router'

export default class WeekDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: null,
      eventUnderEdit: null
    }
    this._onChange = this._onChange.bind(this)
    this.editEvent = this.editEvent.bind(this)
  }

  componentWillMount() {
    EventStore.listen(this._onChange)
  }

  componentDidMount() {
    if (!this.state.events) this._onChange()
    document.body.className = document.body.className + ' noscroll-weekdetail'
  }

  componentWillUnmount() {
    EventStore.unlisten(this._onChange)
    document.body.className = document.body.className.replace(/ noscroll-weekdetail/, '')
  }

  _onChange() {
    this.setState({events: EventStore.getState().getIn(['events', this.props.params.weekno]), eventUnderEdit: null})
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

  render() {
    let form = !this.authed() ? '' :
      <EventForm weekno={this.props.params.weekno} start={this.start()} slug={this.props.params.slug} eventUnderEdit={this.state.eventUnderEdit}/>

    return (
      <div className="week-detail-wrap">
        <Link to={`/${this.props.params.slug}`} className="close-week-detail">close</Link>
        {!UserStore.getState().getIn(['user', 'born']) ? '' :
          <aside className="week-detail">
            <h1 className="brand">
              Week of {this.start().toDateString()}<br/>
              <small>{Math.floor(+this.props.params.weekno/52)} years old</small>
            </h1>
            <h2>This week in {this.whose()} life:</h2>
            <Events events={this.state.events} slug={this.props.slug}
              weekno={this.props.params.weekno}
              authed={this.authed()} onEdit={this.editEvent}
            />
            {form}
          </aside>
        }
      </div>
    )
  }

  start() {
    return UserStore.dateOf(+this.props.params.weekno);
  }
}
