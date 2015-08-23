import React from 'react'
import ReactMixin from 'react-mixin'
import Emoji from 'node-emoji'
import UserStore from '../stores/UserStore'
import LoginStore from '../stores/LoginStore'
import EventStore from '../stores/EventStore'
import EventService from '../services/EventService'
import { Range } from 'immutable'
import { Link } from 'react-router'

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
        <td>{Emoji.get(this.props.event.get('emoji')) || this.props.event.get('emoji')}</td>
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
      emojiInput: null
    }
    this.selectDate = this.selectDate.bind(this)
  }

  componentDidMount() {
    setTimeout(this.initEmojiPicker.bind(this), 500)
  }

  initEmojiPicker() {
    let el = React.findDOMNode(this.refs.emoji)
    jQuery(el).emojiPicker({
      width: el.offsetWidth,
      container: '#emoji-container'
    })
    // For  some reason this doesn't work with `onKeyUp` on the element
    jQuery(document).on('keyup', '#emoji', e => {
      this.setState({emoji: el.value})
    })
  }

  addEvent(e) {
    e.preventDefault()
    EventService.create(this.props.slug, this.state.summary, this.state.emoji, this.state.date)
      .then(() => {
        this.setState({summary: '', emoji: ''})
        React.findDOMNode(this.refs.emoji).value = ''
        React.findDOMNode(this.refs.summary).focus()
      })
      .catch((err) => {
        alert("There was an error creating the event")
        console.log("Error creating event", err)
      });
  }

  get end() {
    return UserStore.dateOf(+this.props.weekno + 1)
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

  toggleEmojiPicker() {
    // highlight all
    jQuery(React.findDOMNode(this.refs.emoji)).emojiPicker('toggle')
  }

  render() {
    return (
      <form role="form" onSubmit={this.addEvent.bind(this)} style={{position: 'relative'}}>
        <h2>Add a new event</h2>
        <p>
          <label htmlFor="summary">Summary</label>
          <input id="summary" name="summary" ref="summary" type="text"
            required valueLink={this.linkState('summary')}
          />
        </p>
        <p id="emoji-container">
          <label htmlFor="emoji">Emoji</label>
          <input id="emoji" name="emoji" ref="emoji" type="text"
            required maxLength="1" onFocus={this.toggleEmojiPicker.bind(this)}
          />
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
    this.setState({events: EventStore.getState().events.get(this.props.params.weekno)})
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
