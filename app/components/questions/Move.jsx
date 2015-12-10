import React from 'react'
import {Link} from 'react-router'

class Move extends React.Component {
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

  prompt1(date) {
    return [
      <header>
        <Link to={`/${this.props.user.slug}`} className="pull-right close-link"><small>No thanks</small></Link>
        <h1 className="brand">Welcome!</h1>
        <small>Answer a few quick questions to make your calendar more fun!</small>
      </header>,
      <p key="prompt1">
        <label htmlFor="date">When's the last time you moved?</label>
        <input type="date" className="form-control" id="date" autoComplete='off'
          onChange={this.prompt1answer.bind(this)} value={date}
        />
      </p>
    ]
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
        <label htmlFor="where">Where to?</label>
        <input type="text" className="form-control" id="where" autoComplete='off'
          onChange={this.prompt2answer.bind(this)} value={value}
        />
      </p>
    ]
  }

  prompt2answer(e) {
    this.setState({
      where: e.target.value,
      prompts: [
        this.prompt1(this.state.date),
        this.prompt2(e.target.value),
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
      emoji: ':truck:',
      title: `Moved to ${this.state.where}`,
      date: this.state.date,
    })
  }
}

Move.propTypes = {
  onSave: React.PropTypes.func,
  user: React.PropTypes.shape({
    slug: React.PropTypes.string,
  }),
}

export default Move
