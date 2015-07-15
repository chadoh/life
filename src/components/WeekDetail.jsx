import React from 'react';
import ReactMixin from 'react-mixin';
import Emoji from 'node-emoji';
import UserStore from '../stores/UserStore';
import LoginStore from '../stores/LoginStore';
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
      events: null
    };
    this._onChange = this._onChange.bind(this);
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
    let deleteButton = !this.authed ? '' :
      <td><button onClick={this.deleteEvent.bind(this)} className="btn btn-link">&times;</button></td>

    let events = this.state.events && this.state.events.map(event => (
      <tr key={event.get('id')} data-id={event.get('id')}>
        <td>{Emoji.get(event.get('emoji'))}</td>
        <td>{event.get('summary')}</td>
        <td className="text-muted">{event.get('date')}</td>
        {event.get('id') ? deleteButton : ''}
      </tr>
    ));

    let form = !this.authed ? '' :
      <form role="form" onSubmit={this.addEvent.bind(this)}>
        <h2>Add a new event</h2>
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
          <input required id="date" name="date" className="form-control"
                 type="date" min={this.start.toISOString().replace(/T.+/, '')}
                 max={this.end.toISOString().replace(/T.+/, '')}
                 valueLink={this.linkState('date')} />
        </div>
        <button type="submit" className="btn btn-default">Save</button>
      </form>

    return (
      <div className="week-detail-wrap">
        <Link to="user" params={{slug: this.props.params.slug}} className="close-week-detail">close</Link>
        {!UserStore.user.get('born') ? '' :
          <aside className="week-detail">
            <h1>
              Week of {this.start.toDateString()} <br />
              <small>{Math.floor(+this.props.params.weekno/52)} years old</small>
            </h1>
            <table className="table">
              {events}
            </table>
            {form}
          </aside>
        }
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
    return UserStore.dateOf(+this.props.params.weekno);
  }

  get end() {
    let startOfNextWeek = UserStore.dateOf(+this.props.params.weekno + 1);
    return new Date(startOfNextWeek.getFullYear(), startOfNextWeek.getMonth(), startOfNextWeek.getDate() - 1);
  }
}

ReactMixin(WeekDetail.prototype, React.addons.LinkedStateMixin);
