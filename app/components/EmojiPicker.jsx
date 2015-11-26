import React from 'react'
import ReactMixin from 'react-mixin'
import ReactEmoji from 'react-emoji'
import emojiMap from 'emoji-annotation-to-unicode'

export default class EmojiPicker extends React.Component {
  emojis() {
    let query = this.props.query.replace(/:/g, '')
    if(query && query[0].match(/[\+\-]/)) {
      query = `${'\\'}${query}`
    }
    return Object.keys(emojiMap).
      filter(key => key.match(`^(?:${query})`)).
      slice(0,68)
  }

  render() {
    return (
      <span style={this.props.style}>
        {this.emojis().map(emoji => {
          const yay = `:${emoji}:`
          return (
            <a key={emoji} className="emoji-picker-emoji"
              onClick={this.props.onSelect.bind(null, yay)}
              style={{padding: '0.2rem', cursor: 'pointer'}}>
              {this.emojify(yay, {singleEmoji: true})}
            </a>
          )
        })}
      </span>
    )
  }
}
ReactMixin(EmojiPicker.prototype, ReactEmoji);
