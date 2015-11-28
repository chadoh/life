import React from 'react'
import ReactMixin from 'react-mixin'
import ReactEmoji from 'react-emoji'
import EventService from '../services/EventService'

export default class Event extends React.Component {
  constructor(props) {
    super(props)
    this.renderActions = this.renderActions.bind(this)
    this.deleteEvent = this.deleteEvent.bind(this)
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
        <td>
          <a onClick={this.props.onEdit} className="action-link">
            {this.emojify(':pencil2:', {attributes: {height: '10px', width: '10px'}})}
          </a>
          <a className="action-link" onClick={this.deleteEvent.bind(this, this.props.event.get('id'), this.props.weekno)}>
            {this.emojify(':x:', {attributes: {height: '10px', width: '10px'}})}
          </a>
        </td>
      )
    }
  }

  render() {
    return (
      <tr>
        <td>{this.emojify(this.props.event.get('emoji'), {attributes: {className: 'emoji'}})}</td>
        <td>{this.props.event.get('title')}</td>
        <td className="text-muted">{this.props.event.get('date')}</td>
        {this.props.event.get('id') ? this.renderActions() : null}
      </tr>
    )
  }
}
ReactMixin(Event.prototype, ReactEmoji);

