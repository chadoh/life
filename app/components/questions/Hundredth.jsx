import React from 'react'
import {Link} from 'react-router'

class Hundredth extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      prompts: [this.prompt1(), this.props.skip()]
    }
  }

  render() {
    return (
      <form role="form" onSubmit={this.save.bind(this)}>
        {this.state.prompts}
      </form>
    )
  }

  prompt1(value) {
    return [
      <p key="prompt1">
        What do you want to do on your 100th birthday?
      </p>,
      <p key="answer1" className="horizontal-spacing">
        {[['runner', 'Go for a run'], ['bike', 'Ride a bike'],
          ['mount_fuji', 'Climb a mountain'],
          ['tropical_fish', 'Go for a swim'],
          ['sunrise', 'Paint a sunrise'],
        ].map(([emoji, title]) => {
          return <label key={emoji} style={{minWidth: 200}}>
            <input type="radio" name="prompt1" value={emoji}
              onChange={this.prompt1answer.bind(this, emoji, title)} checked={value === emoji}/>
            <span className="checkable">{title}</span>
          </label>
        })}
      </p>
    ]
  }

  prompt1answer(emoji, title) {
    this.setState({
      emoji: emoji,
      title: title,
      prompts: [
        this.prompt1(emoji),
        this.props.skip(),
      ]
    })
    setTimeout(() => this.save(), 20)
  }

  save(e) {
    if(e) e.preventDefault();
    this.props.onSave({
      emoji: `:${this.state.emoji}:`,
      title: this.state.title,
      date: this.date(),
    })
  }

  date() {
    let [year, month, day] = this.props.user.born.split('-')
    return `${+year + 100}-${month}-${day}`
  }
}

Hundredth.propTypes = {
  onSave: React.PropTypes.func,
  user: React.PropTypes.shape({
    born: React.PropTypes.string,
  }),
}

export default Hundredth
