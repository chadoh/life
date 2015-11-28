import React from 'react'
import ReactMixin from 'react-mixin'
import ReactEmoji from 'react-emoji'
import UserStore from '../stores/UserStore'
import LoginStore from '../stores/LoginStore'
import EventStore from '../stores/EventStore'
import EventService from '../services/EventService'
import NewEventForm from './NewEventForm'
import { Range } from 'immutable'
import { Link } from 'react-router'

class Event extends React.Component {
  deleteEvent(e) {
    let id = +e.target.getAttribute('data-id');
    let weekno = +e.target.getAttribute('data-weekno');
    EventService.destroy(this.props.slug, id, weekno)
      .catch((err) => {
        console.log("Error destroying event", err);
      });
  }

  render() {
    let deleteButton = !this.props.authed ? '' :
      <td>
        <button onClick={this.deleteEvent.bind(this)} className="pseudo" data-id={this.props.event.get('id')} data-weekno={this.props.weekno}>
          &times;
        </button>
      </td>

    return (
      <tr>
        <td>{this.emojify(this.props.event.get('emoji'), {attributes: {className: 'emoji'}})}</td>
        <td>{this.props.event.get('title')}</td>
        <td className="text-muted">{this.props.event.get('date')}</td>
        {this.props.event.get('id') ? deleteButton : null}
      </tr>
    )
  }
}
ReactMixin(Event.prototype, ReactEmoji);

export default class WeekDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = { events: null }
    this._onChange = this._onChange.bind(this)
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
    this.setState({events: EventStore.getState().getIn(['events', this.props.params.weekno])})
  }

  authed() {
    return LoginStore.getState().user &&
      LoginStore.getState().user.id === UserStore.getState().getIn(['user', 'id'])
  }

  render() {
    let events = this.state.events && this.state.events.map(event => (
      <Event
        key={event.get('date') + event.get('id')}
        slug={this.props.params.slug}
        weekno={this.props.params.weekno}
        event={event}
        authed={this.authed()}
      />
    ));

    let form = !this.authed() ? '' :
      <NewEventForm weekno={this.props.params.weekno} start={this.start()} slug={this.props.params.slug} />

    return (
      <div className="week-detail-wrap">
        <Link to={`/${this.props.params.slug}`} className="close-week-detail">close</Link>
        {!UserStore.getState().getIn(['user', 'born']) ? '' :
          <aside className="week-detail">
            <h1 className="brand">
              Week of {this.start().toDateString()}<br/>
              <small>{Math.floor(+this.props.params.weekno/52)} years old</small>
            </h1>
            <table>
              <tbody>
                {events}
              </tbody>
            </table>
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
