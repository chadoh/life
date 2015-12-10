import React from 'react'
import {Link} from 'react-router'

class Question1 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      prompts: [this.prompt1(), this.cancelButton(), this.props.skip()]
    }

  }

  render() {
    return (
      <form role="form" onSubmit={this.save.bind(this)}>
        {this.state.prompts}
      </form>
    )
  }

  prompt1(date) {
    return [
      <header>
        <Link to={`/${this.props.user.slug}`} className="pull-right close-link"><small>No thanks</small></Link>
        <h1 className="brand">Welcome!</h1>
        <small>Answer a few quick questions to make your calendar more fun!</small>
      </header>,
      <p key="prompt1">
        <label htmlFor="date">When's the last time you went on a big trip?</label>
        <input type="date" className="form-control" id="date" autoComplete='off'
          onChange={this.prompt1answer.bind(this)} value={date}
        />
      </p>
    ]
  }

  cancelButton() {
    return <a key="cancel" onClick={this.save.bind(this)} href="#next">
      I never have
    </a>
  }

  prompt1answer(e) {
    this.setState({
      date: e.target.value,
      prompts: [
        this.prompt1(e.target.value),
        this.prompt2(),
      ]
    })
  }

  prompt2(value) {
    return [
      <p key="prompt2">
        How'd you get there?
      </p>,
      <p key="answer2">
        {['car', 'airplane', 'train', 'bus', 'boat'].map(mode => {
          return <label key={mode} style={{minWidth: 100}}>
            <input type="radio" name="prompt2" value={mode}
              onChange={this.prompt2answer.bind(this)} checked={value === mode}/>
            <span className="checkable">{mode}</span>
          </label>
        })}
      </p>
    ]
  }

  prompt2answer(e) {
    this.setState({
      emoji: e.target.value,
      prompts: [
        this.prompt1(this.state.date),
        this.prompt2(e.target.value),
        this.prompt3(),
      ]
    })
  }

  prompt3(value) {
    return [
      <p key="prompt3">
        <label htmlpFor="where">Where'd you go?</label>
        <input type="text" required className="form-control" id="where" autoComplete='off'
          onChange={this.prompt3answer.bind(this)} value={value}
        />
      </p>
    ]
  }

  prompt3answer(e) {
    this.setState({
      where: e.target.value,
      prompts: [
        this.prompt1(this.state.date),
        this.prompt2(this.state.emoji),
        this.prompt3(e.target.value),
        this.saveButton(),
      ]
    })
  }

  saveButton() {
    return <button key="save" type="submit" className="brand">
      Next Question !
    </button>
  }

  save(e) {
    e.preventDefault()
    this.props.onSave({
      emoji: `:${this.state.emoji}:`,
      title: this.title(),
      date: this.state.date,
    })
  }

  title() {
    if(this.state.where) return `Went to ${this.state.where}`
  }
}

Question1.propTypes = {
  onSave: React.PropTypes.func,
  user: React.PropTypes.shape({
    slug: React.PropTypes.string,
  }),
}

export default Question1
