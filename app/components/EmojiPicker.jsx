import React from 'react'
import ReactMixin from 'react-mixin'
import ReactEmoji from 'react-emoji'
import emojiMap from '../lib/emojiMap'

const emojis = query => {
  query = query.replace(/:/g, '').replace(/([\+\-])/g, "\\$&")

  return emojiMap.
    filter(e => e.name.match(`${query}`) || e.alternatives.match(`${query}`)).
    slice(0,68)
}

export default class EmojiPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hovered: null
    }

    this.blurred = this.blurred.bind(this)
  }

  footer() {
    if(this.state.hovered) {
      return <span><br/>{this.state.hovered}</span>
    }
  }

  hovered(emoji) {
    this.setState({hovered: emoji})
  }

  blurred() {
    this.setState({hovered: null})
  }

  render() {
    let emojiLinks = emojis(this.props.query).map(emoji => {
      emoji = emoji.name;
      const yay = `:${emoji}:`
      return (
        <a key={emoji} className="emoji-picker-emoji"
          onClick={this.props.onSelect.bind(null, yay)}
          onMouseEnter={this.hovered.bind(this, yay)}
          onMouseLeave={this.blurred}
          style={{padding: '0.2rem', cursor: 'pointer'}}>
          {this.emojify(yay, {singleEmoji: true})}
        </a>
      )
    })
    if(emojiLinks.length === 0) emojiLinks = "No emojis found";

    return (
      <span style={this.props.style}>
        {emojiLinks}
        {this.footer()}
      </span>
    )
  }
}
ReactMixin(EmojiPicker.prototype, ReactEmoji);
