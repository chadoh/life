import React from 'react'
import ReactMixin from 'react-mixin'
import ReactEmoji from 'react-emoji'
import emojiMap from '../lib/emojiMap'

const tabStyle = {
  marginRight: '0.4rem',
  display: 'inline-block',
  padding: '0.2rem 0.3rem',
  border: '1px solid silver',
  borderBottom: 'none',
  borderRadius: '0.3rem 0.3rem 0 0',
  cursor: 'pointer',
}

const filterByName = ({emoji, query}) => {
  return emoji.name.match(`${query}`) || emoji.alternatives.match(`${query}`)
}

const filterByCategory = ({emoji, category}) => {
  return emoji.category === category
}

export default class EmojiPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hovered: null,
      category: 'people',
    }

    this.blurred = this.blurred.bind(this)
    this.setCategory = this.setCategory.bind(this)
    this.grabKeyPress = this.grabKeyPress.bind(this)
    this.emojis = this.emojis.bind(this)
    this.selectFirst = this.selectFirst.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.grabKeyPress, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.grabKeyPress, false)
  }

  grabKeyPress(e) {
    if(e.keyCode === 13 || e.keyCode === 9) {
      e.preventDefault()
      this.selectFirst()
    }
  }

  selectFirst() {
    if(this.emojis()[0]) {
      this.props.onSelect(`:${this.emojis()[0].name}:`)
    }
  }

  emojis() {
    const query = (this.props.query || '').replace(/:/g, '').replace(/([\+\-])/g, "\\$&");
    const category = this.state.category;

    return emojiMap.filter(emoji => {
      return query ? filterByName({emoji, query}) : filterByCategory({emoji, category})
    })
  }

  setCategory(category) {
    this.setState({category})
  }

  header() {
    if(!this.props.query) {
      return (
        <span>
          <a style={tabStyle} className="emoji-picker-emoji"
            onClick={this.setCategory.bind(this, 'people')}>
            {this.emojify(':smiley:', {singleEmoji: true})}
          </a>
          <a style={tabStyle} className="emoji-picker-emoji"
            onClick={this.setCategory.bind(this, 'nature')}>
            {this.emojify(':seedling:', {singleEmoji: true})}
          </a>
          <a style={tabStyle} className="emoji-picker-emoji"
            onClick={this.setCategory.bind(this, 'objects')}>
            {this.emojify(':telescope:', {singleEmoji: true})}
          </a>
          <a style={tabStyle} className="emoji-picker-emoji"
            onClick={this.setCategory.bind(this, 'places')}>
            {this.emojify(':bike:', {singleEmoji: true})}
          </a>
          <a style={tabStyle} className="emoji-picker-emoji"
            onClick={this.setCategory.bind(this, 'symbols')}>
            {this.emojify(':1234:', {singleEmoji: true})}
          </a>
          <br/>
        </span>
      )
    }
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
    let emojiLinks = this.emojis().map(emoji => {
      emoji = `:${emoji.name}:`
      return (
        <a key={emoji} className="emoji-picker-emoji"
          onClick={this.props.onSelect.bind(null, emoji)}
          onMouseEnter={this.hovered.bind(this, emoji)}
          onMouseLeave={this.blurred}
          style={{padding: '0.2rem', cursor: 'pointer'}}>
          {this.emojify(emoji, {singleEmoji: true})}
        </a>
      )
    })
    if(emojiLinks.length === 0) emojiLinks = "No emojis found";

    return (
      <span style={this.props.style}>
        {this.header()}
        {emojiLinks}
        {this.footer()}
      </span>
    )
  }
}
ReactMixin(EmojiPicker.prototype, ReactEmoji);
