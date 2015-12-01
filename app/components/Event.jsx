import React from 'react'
import ReactMixin from 'react-mixin'
import ReactEmoji from 'react-emoji'
import EventService from '../services/EventService'

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

export default class Event extends React.Component {
  constructor(props) {
    super(props)
    this.renderActions = this.renderActions.bind(this)
    this.deleteEvent = this.deleteEvent.bind(this)
    this.date = this.date.bind(this)
  }

  deleteEvent(id, weekno) {
    EventService.destroy(this.props.slug, id, weekno)
      .catch((err) => {
        console.log("Error destroying event", err);
      });
  }

  renderActions() {
    if(this.props.authed) {
      return (
        <span>
          {!this.props.onEdit ? null :
            <a onClick={this.props.onEdit} className="action-link">
              {this.emojify(':pencil2:', {attributes: {height: '10px', width: '10px'}})}
            </a>
          }
          <a className="action-link" onClick={this.deleteEvent.bind(this, this.props.event.get('id'), this.props.weekno)}>
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

  render() {
    return (
      <li>
        <table>
          <tbody>
            <tr>
              <td rowSpan="2" className="text-muted">{this.emojify(this.props.event.get('emoji'), {attributes: {className: 'emoji'}})} {this.date()}</td>
              <td><h5>{this.props.event.get('title')}</h5></td>
              <td>{this.props.event.get('id') ? this.renderActions() : null}</td>
            </tr>
            {!this.props.event.get('description') ? null :
              <tr>
                <td colSpan="2" className="description">{this.props.event.get('description')}</td>
              </tr>
            }
          </tbody>
        </table>
      </li>
    )
  }
}
ReactMixin(Event.prototype, ReactEmoji);

