import React from 'react'
import ReactMixin from 'react-mixin'
import ReactEmoji from 'react-emoji'
import EventService from '../services/EventService'
import Linkify from 'react-linkify'
import Immutable from 'immutable'

const months = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
}

class Event extends React.Component {
  constructor(props) {
    super(props)
    this.renderActions = this.renderActions.bind(this)
    this.deleteEvent = this.deleteEvent.bind(this)
    this.date = this.date.bind(this)
    this.markDone = this.markDone.bind(this)
    this.createEvent = this.createEvent.bind(this)
    this.snooze = this.snooze.bind(this)
  }

  deleteEvent() {
    EventService.destroy(this.props.slug, this.props.event.get('id'), this.props.weekno)
  }

  renderActions() {
    if(this.props.authed && this.props.onEdit) {
      return (
        <span>
          <a onClick={this.props.onEdit} className="action-link">
            {this.emojify(':pencil2:', {attributes: {height: '10px', width: '10px'}})}
          </a>
          <a className="action-link" onClick={this.deleteEvent}>
            {this.emojify(':x:', {attributes: {height: '10px', width: '10px'}})}
          </a>
        </span>
      )
    }
  }

  date() {
    let year, month, day;
    [year, month, day] = this.props.event.get('date').split('-')
    day = day.replace(/^0/, '')
    month = months[month]
    return `${day} ${month}`
  }

  isPlan() {
    const event = this.props.event;
    return event.get('date') > event.get('created_at')
  }

  expiredPlan() {
    return this.props.authed && this.isPlan() &&
      this.props.event.get('date') < (new Date()).toISOString()
  }

  createEvent() {
    const event = this.props.event;
    EventService.create({
      slug: this.props.slug,
      title: event.get('title'),
      emoji: event.get('emoji'),
      date: event.get('date'),
      description: event.get('description'),
    })
  }

  markDone() {
    this.createEvent()
    this.deleteEvent()
  }

  snooze() {
    const event = this.props.event;
    const nextWeek = new Date(604800000 + (new Date()).getTime())
    EventService.update({
      slug: this.props.slug,
      id: event.get('id'),
      date: nextWeek.toISOString(),
      weekno: this.props.weekno,
    })
  }

  renderExpiredPlanActions() {
    if(this.expiredPlan()) {
      return <div className="button-group">
        <button className="success" onClick={this.markDone}>
          {this.emojify(':checkered_flag:', {singleEmoji: true})}
        </button>
        <button className="warning" onClick={this.snooze}>
          {this.emojify(':sleeping:', {singleEmoji: true})}
        </button>
        <button className="error" onClick={this.deleteEvent}>
          {this.emojify(':boom:', {singleEmoji: true})}
        </button>
      </div>
    }
  }

  render() {
    return (
      <li className={this.expiredPlan() ? "expired-plan" : ""}>
        <h5>
          {this.emojify(this.props.event.get('emoji'), {attributes: {className: 'emoji'}})}
          {this.isPlan() ? " Plan: " : " "}
          {this.props.event.get('title')}
        </h5>
        <small className="text-muted">{this.date()}</small>
        <span className="pull-right">{this.props.event.get('id') ? this.renderActions() : null}</span>
        <br/>
        <small className="description">
          <Linkify>{this.props.event.get('description')}</Linkify>
        </small>
        {this.renderExpiredPlanActions()}
      </li>
    )
  }
}

ReactMixin(Event.prototype, ReactEmoji);

Event.propTypes = {
  slug: React.PropTypes.string.isRequired,
  event: (props) => {
    if(!Immutable.Map.isMap(props.event))
      return new Error("Expected event to be an Immutable.Map!")
  },
  weekno: React.PropTypes.number.isRequired,
  authed: React.PropTypes.bool.isRequired,
  onEdit: React.PropTypes.func,
}

export default Event;
