import React from 'react';
import ReactMixin from 'react-mixin';
import Emoji from 'node-emoji';
import EventStore from '../stores/EventStore';
import EventService from '../services/EventService';
import { Range } from 'immutable';
import { Link } from 'react-router';

export default class WeekDetail extends React.Component {
  constructor() {
    super()
    this.state = {
      summary: '',
      emoji: '',
      date: '',
      events: []
    };
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    EventStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({events: EventStore.eventsFor(this.start, this.end)});
  }

  render() {
    let events = this.state.events.map(event => (
      <tr key={event.get('id')} data-id={event.get('id')}>
        <td>{Emoji.get(event.get('emoji'))}</td>
        <td>{event.get('summary')}</td>
        <td className="text-muted">{event.get('date').toDateString()}</td>
        <td><button onClick={this.deleteEvent.bind(this)} className="btn btn-link">&times;</button></td>
      </tr>
    ));

    return (
      <div className="week-detail-wrap">
        <Link to="user" params={{slug: this.props.params.slug}} className="close-week-detail">close</Link>
        <aside className="week-detail">
          <h1>{this.props.params.start} <small>to</small> {this.props.params.end}</h1>
          <table className="table">
            {events}
          </table>
          <h2>Add a new event</h2>
          <form role="form" onSubmit={this.addEvent.bind(this)}>
            <div className="form-group">
              <label htmlFor="summary">Summary</label>
              <input required id="summary" name="summary" className="form-control" type="text" placeholder="Left for Mars" valueLink={this.linkState('summary')} ref="summary"/>
            </div>
            <div className="form-group">
              <label htmlFor="emoji">Emoji</label>
              <input required id="emoji" name="emoji" className="form-control" type="text" placeholder="milky_way" valueLink={this.linkState('emoji')} />
              <p className="help-block">Use the names from <a target="_blank" href="http://www.emoji-cheat-sheet.com/">the emoji cheat sheet</a></p>
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input required id="date" name="date" className="form-control" type="date" min={this.props.params.start} max={this.props.params.end} valueLink={this.linkState('date')} />
            </div>
            <button type="submit" className="btn btn-default">Save</button>
          </form>
        </aside>
      </div>
    )
  }

  deleteEvent(e) {
    let id = +e.target.closest('tr').getAttribute('data-id');
    EventService.destroy(this.props.params.slug, id)
      .catch((err) => {
        alert("There was an error destroying the event");
        console.log("Error destroying event", err);
      });
  }

  addEvent(e) {
    e.preventDefault();
    EventService.create(this.props.params.slug, this.state.summary, this.state.emoji, this.state.date)
      .then(() => {
        this.setState({summary: '', emoji: '', date: ''});
        this.refs.summary.getDOMNode().focus();
      })
      .catch((err) => {
        alert("There was an error creating the event");
        console.log("Error creating event", err);
      });
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

ReactMixin(WeekDetail.prototype, React.addons.LinkedStateMixin);
