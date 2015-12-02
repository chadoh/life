import React from 'react'
import ReactMixin from 'react-mixin'
import LinkedStateMixin from 'react-addons-linked-state-mixin'
import UserStore from '../stores/UserStore'
import EventService from '../services/EventService'
import emojiMap from 'react-emoji-picker/lib/emojiMap'
import EmojiPicker from 'react-emoji-picker'
import { Link } from 'react-router'
import { FREE_EVENTS } from '../config'

const emojiPickerStyles = {
  position: 'absolute',
  left: 0, top: '3.9rem',
  backgroundColor: 'white',
  width: '100%',
  padding: '.3em .6em',
  border: '1px solid #0074d9',
  borderTop: 'none',
  zIndex: '2'
}

export default class EventForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: null,
      title: '',
      emoji: '',
      date: '',
      description: '',
    }

    this.selectDate = this.selectDate.bind(this)
    this.pickedEmoji = this.pickedEmoji.bind(this)
    this.toggleEmojiPicker = this.toggleEmojiPicker.bind(this)
    this.validateEmoji = this.validateEmoji.bind(this)
    this.saveEvent = this.saveEvent.bind(this)
  }

  componentDidMount() {
    document.addEventListener('click', this.toggleEmojiPicker, false)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.toggleEmojiPicker, false)
  }

  componentDidUpdate(prevProps) {
    if(this.props.eventUnderEdit !== prevProps.eventUnderEdit) {
      const event = this.props.eventUnderEdit;
      if(event) {
        this.setState({
          id: event.get('id'),
          title: event.get('title'),
          emoji: event.get('emoji'),
          date: event.get('date'),
          description: event.get('description'),
        })
      } else {
        this.setState({
          id: null, title: '', emoji: '', date: '', description: '',
        })
      }
    }
  }

  saveEvent(e) {
    e.preventDefault()
    EventService.save({
      slug: this.props.slug,
      id: this.state.id,
      title: this.state.title,
      emoji: this.state.emoji,
      date: this.state.date,
      description: this.state.description,
    })
      .then(() => {
        this.setState({title: '', emoji: '', description: ''})
        if(this.refs.title) this.refs.title.focus();
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
      const dateString = date.toISOString().replace(/T.+/, '')
      dates.push(
        <label key={date}>
          <br/>
          <input type="radio" name="date"
            value={dateString}
            onChange={this.selectDate} checked={this.state.date === dateString}/>
          <span className="checkable">{date.toDateString()}</span>
        </label>
      )
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
    }
    return dates
  }

  emojiPicker() {
    if(this.state.showEmojiPicker) {
      return (
        <EmojiPicker
          style={emojiPickerStyles} onSelect={this.pickedEmoji}
          query={this.state.emoji}
          />
      )
    }
  }

  pickedEmoji(emoji) {
    this.setState({emoji})
    this.refs.description.focus()
  }

  toggleEmojiPicker(e) {
    if(this.refs.emoji.contains(e.target)) {
      this.setState({showEmojiPicker: true});
    } else {
      setTimeout(this.validateEmoji, 10)
      this.setState({showEmojiPicker: false});
    }
  }

  validateEmoji() {
    const matched = emojiMap.filter(emoji => {
      return `:${emoji.name}:` === this.state.emoji
    })

    if(matched.length === 0) {
      this.setState({emoji: null})
    }
  }

  grabKeyPress(e) {
    if(e.keyCode === 13) {
      e.preventDefault()
    }
  }

  remainingEvents() {
    if(!this.props.signedInUser.paid) {
      const remaining = FREE_EVENTS - this.props.signedInUser.event_count;
      return (
        <small>
          {remaining} free event{remaining === 1 ? ' ' : 's '}
          remaining – <Link to="/pricing">why?</Link>
        </small>
      )
    }
  }

  render() {
    return (
      <form role="form" onSubmit={this.saveEvent} style={{position: 'relative'}} onFocus={this.toggleEmojiPicker}>
        <h2>{this.props.eventUnderEdit ? 'Edit' : 'Add a new'} event:</h2>
        {this.remainingEvents()}
        <p>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" ref="title" type="text"
            required autoComplete="off" valueLink={this.linkState('title')}
          />
        </p>
        <p style={{position: 'relative'}} ref="emoji">
          <label htmlFor="emoji">Single-symbol summary</label>
          <input id="emoji" name="emoji" autoComplete="off"
            type={this.state.showEmojiPicker ? "search" : "text"}
            required onKeyDown={this.grabKeyPress}
            valueLink={this.linkState('emoji')}
          />
          {this.emojiPicker()}
          <small>Describe it with one small picture</small>
        </p>
        <p>
          <label htmlFor="description">Description</label>
          <textarea ref="description" valueLink={this.linkState('description')}/>
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

ReactMixin(EventForm.prototype, LinkedStateMixin);
