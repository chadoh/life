import React from 'react'
import ReactMixin from 'react-mixin'
import ReactEmoji from 'react-emoji'
import emojiMap from 'emoji-annotation-to-unicode'

const emojis = Object.keys(emojiMap).slice(0,68)

export default class EmojiPicker extends React.Component {
  render() {
    return (
      <span style={this.props.style}>
        {emojis.map(emoji => {
          const yay = `:${emoji}:`
          return (
            <a key={yay} className="emoji-picker-emoji" onClick={this.props.onSelect.bind(null, yay)} style={{padding: '0.2rem', cursor: 'pointer'}}>
              {this.emojify(yay)}
            </a>
          )
        })}
      </span>
    )
  }
}
ReactMixin(EmojiPicker.prototype, ReactEmoji);
