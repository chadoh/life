import React from 'react'
import ReactMixin from 'react-mixin'
import LinkedStateMixin from 'react-addons-linked-state-mixin'
import EmojiPicker from './EmojiPicker'
import UserStore from '../stores/UserStore'

const emojiPickerStyles = {
  position: 'absolute',
  left: 0, top: '100%',
  backgroundColor: 'white',
  width: '100%',
  padding: '.3em .6em',
  border: '1px solid #0074d9',
  borderTop: 'none',
  zIndex: '2'
}

export default class NewEventForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      summary: '',
      emoji: '',
      date: '',
    }
    this.selectDate = this.selectDate.bind(this)
    this.showEmojiPicker = this.showEmojiPicker.bind(this)
    this.hideEmojiPicker = this.hideEmojiPicker.bind(this)
    this.pickedEmoji = this.pickedEmoji.bind(this)
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
          <br/>
          <input ref={date === this.props.start ? 'date' : ''}
            type="radio" name="date"
            value={date.toISOString().replace(/T.+/, '')}
            onChange={this.selectDate}/>
          <span className="checkable">{date.toDateString()}</span>
        </label>
      )
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
    }
    return dates
  }

  showEmojiPicker() {
    this.setState({showEmojiPicker: true})
  }

  hideEmojiPicker() {
    setTimeout(() => {
      this.setState({showEmojiPicker: false})
    }, 250)
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
    this.refs.date.focus()
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
        <p style={{position: 'relative'}}>
          <label htmlFor="emoji">Emoji</label>
          <input id="emoji" name="emoji" ref="emoji" type="text" autoComplete="off"
            required onFocus={this.showEmojiPicker} onBlur={this.hideEmojiPicker}
            valueLink={this.linkState('emoji')}
          />
          {this.emojiPicker()}
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
