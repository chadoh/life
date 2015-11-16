import React from 'react'
import ReactMixin from 'react-mixin'
import LinkedStateMixin from 'react-addons-linked-state-mixin'
import ReactEmoji from 'react-emoji';
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
        <td>{this.props.event.get('summary')}</td>
        <td className="text-muted">{this.props.event.get('date')}</td>
        {this.props.event.get('id') ? deleteButton : ''}
      </tr>
    )
  }
}
ReactMixin(Event.prototype, ReactEmoji);

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
    // setTimeout(this.initEmojiPicker.bind(this), 500)
  }

  initEmojiPicker() {
    // let el = this.refs.emoji
    // jQuery(el).emojiPicker({
    //   width: el.offsetWidth,
    //   container: '#emoji-container'
    // })
    // // For  some reason this doesn't work with `onKeyUp` on the element
    // jQuery(document).on('keyup', '#emoji', e => {
    //   this.setState({emoji: el.value})
    // })
  }

  addEvent(e) {
    e.preventDefault()
    EventService.create(this.props.slug, this.state.summary, this.state.emoji, this.state.date)
      .then(() => {
        this.setState({summary: '', emoji: ''})
        this.refs.emoji.value = ''
        this.refs.summary.focus()
      })
      .catch((err) => {
        console.log("Error creating event", err)
      });
  }

  end() {
    return UserStore.dateOf(+this.props.weekno + 1)
  }

  selectDate(e) {
    this.setState({date: e.target.value})
  }

  dates() {
    let dates = []
    let date = this.props.start;
    while (date < this.end()) {
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
    // jQuery(this.refs.emoji).emojiPicker('toggle')
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
            required onFocus={this.toggleEmojiPicker.bind(this)} valueLink={this.linkState('emoji')}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          {this.dates()}
        </p>
        <button type="submit" className="btn btn-default">Save</button>
      </form>
    )
  }
}

ReactMixin(NewEventForm.prototype, LinkedStateMixin);

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
        <Link to="user" params={{slug: this.props.params.slug}} className="close-week-detail">close</Link>
        {!UserStore.getState().getIn(['user', 'born']) ? '' :
          <aside className="week-detail">
            <h1 className="brand">
              Week of {this.start().toDateString()}<br/>
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

  start() {
    return UserStore.dateOf(+this.props.params.weekno);
  }
}
