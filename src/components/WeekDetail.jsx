import React from 'react';
import Emoji from 'node-emoji';
import EventStore from '../stores/EventStore';
import { Range } from 'immutable';
import { Link } from 'react-router';

export default class WeekDetail extends React.Component {
  render() {
    let events = EventStore.eventsFor(this.start, this.end).map(event => (
      <tr key={event.get('id')}>
        <td>{Emoji.get(event.get('emoji'))}</td>
        <td>{event.get('summary')}</td>
        <td className="text-muted">{event.get('date').toDateString()}</td>
      </tr>
    ));
    return (
      <div className="week-detail-wrap">
        <Link to="user" params={{slug: this.props.params.slug}} className="close-week-detail">close</Link>
        <aside className="week-detail">
          <h1>{this.props.params.start} <small>to</small> {this.props.params.end}</h1>
          <br />
          <br />
          <table className="table">
            {events}
          </table>
        </aside>
      </div>
    )
  }

  get start() {
    return this.dateFromString(this.props.params.start);
  }
  get end() {
    return this.dateFromString(this.props.params.end);
  }

  dateFromString(str) {
    return new Date(str.split('-'))
  }
}
