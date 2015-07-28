import React from 'react';
import ReactMixin from 'react-mixin';
import Emoji from 'node-emoji';
import UserStore from '../stores/UserStore';
import LoginStore from '../stores/LoginStore';
import EventStore from '../stores/EventStore';
import EventService from '../services/EventService';
import { Range } from 'immutable';
import { Link } from 'react-router';

class Event extends React.Component {
  deleteEvent(e) {
    let id = +e.target.getAttribute('data-id');
    let weekno = +e.target.getAttribute('data-weekno');
    EventService.destroy(this.props.slug, id, weekno)
      .catch((err) => {
        alert("There was an error destroying the event");
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
        <td>{Emoji.get(this.props.event.get('emoji'))}</td>
        <td>{this.props.event.get('summary')}</td>
        <td className="text-muted">{this.props.event.get('date')}</td>
        {this.props.event.get('id') ? deleteButton : ''}
      </tr>
    )
  }
}

class NewEventForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      summary: '',
      emoji: '',
      date: '',
    }
    this.selectDate = this.selectDate.bind(this)
  }

  addEvent(e) {
    e.preventDefault();
    EventService.create(this.props.slug, this.state.summary, this.state.emoji, this.state.date)
      .then(() => {
        this.setState({summary: '', emoji: ''});
        this.refs.summary.getDOMNode().focus();
      })
      .catch((err) => {
        alert("There was an error creating the event");
        console.log("Error creating event", err);
      });
  }

  get end() {
    return UserStore.dateOf(+this.props.weekno + 1);;
  }

  selectDate(e) {
    this.setState({date: e.target.value})
  }

  get dates() {
    let dates = []
    let date = this.props.start;
    while (date < this.end) {
      dates.push(
        <label key={date}>
          <br/><input type="radio" name="date" value={date.toISOString().replace(/T.+/, '')} onChange={this.selectDate}/>
          <span className="checkable">{date.toDateString()}</span>
        </label>
      )
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
    }
    return dates
  }

  render() {
    return (
      <form role="form" onSubmit={this.addEvent.bind(this)}>
        <h2>Add a new event</h2>
        <p>
          <label htmlFor="summary">Summary</label>
          <input required id="summary" name="summary" className="form-control" type="text" placeholder="Left for Mars" valueLink={this.linkState('summary')} ref="summary"/>
        </p>
        <p>
          <label htmlFor="emoji">Emoji</label>
          <input required id="emoji" name="emoji" className="form-control" type="text" placeholder="milky_way" valueLink={this.linkState('emoji')} />
          <small className="text-muted">Use the names from <a target="_blank" href="http://www.emoji-cheat-sheet.com/">the emoji cheat sheet</a></small>
        </p>
        <p>
          <label htmlFor="date">Date</label>
          {this.dates}
        </p>
        <button type="submit" className="btn btn-default">Save</button>
      </form>
    )
  }
}

ReactMixin(NewEventForm.prototype, React.addons.LinkedStateMixin);

export default class WeekDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = { events: null }
    this._onChange = this._onChange.bind(this)
  }

  componentWillMount() {
    EventStore.listen(this._onChange);
  }

  componentDidMount() {
    if (!this.state.events) this._onChange();
  }

  componentWillUnmount() {
    EventStore.unlisten(this._onChange);
  }

  _onChange() {
    this.setState({events: EventStore.getState().events.get(this.props.params.weekno)});
  }

  get authed() {
    return LoginStore.getState().user &&
      LoginStore.getState().user.id === UserStore.getState().user.get('id')
  }

  render() {
    let events = this.state.events && this.state.events.map(event => (
      <Event
        key={event.get('date') + event.get('id')}
        slug={this.props.params.slug}
        weekno={this.props.params.weekno}
        event={event}
        authed={this.authed}
      />
    ));

    let form = !this.authed ? '' :
      <NewEventForm weekno={this.props.params.weekno} start={this.start} slug={this.props.params.slug} />

    return (
      <div className="week-detail-wrap">
        <Link to="user" params={{slug: this.props.params.slug}} className="close-week-detail">close</Link>
        {!UserStore.getState().user.get('born') ? '' :
          <aside className="week-detail">
            <h1 className="brand">
              Week of {this.start.toDateString()}<br/>
              <small>{Math.floor(+this.props.params.weekno/52)} years old</small>
            </h1>
            <table>
              {events}
            </table>
            {form}
          </aside>
        }
      </div>
    )
  }

  get start() {
    return UserStore.dateOf(+this.props.params.weekno);
  }
}
