import React from 'react'

class Relationship extends React.Component {
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
        Do you have any young siblings?
      </p>,
      <p key="answer1" className="horizontal-spacing">
        <label style={{minWidth: 200}}>
          <input type="radio" name="prompt1" value="yes"
            onChange={this.prompt1answer1.bind(this)} checked={value === "yes"}/>
          <span className="checkable">Yes</span>
        </label>
        <label style={{minWidth: 200}}>
          <input type="radio" name="prompt1" value="no"
            onChange={this.prompt1answer2.bind(this)} checked={value === "no"}/>
          <span className="checkable">No</span>
        </label>
      </p>
    ]
  }

  prompt1answer1() {
    this.setState({
      prompts: [
        this.prompt1('yes'),
        this.prompt2()
      ]
    })
  }

  prompt1answer2(e) {
    this.setState({prompts: [
      this.prompt1('no'),
    ]})
    this.save(e)
  }

  prompt2(value) {
    return [
      <p key="prompt2">
        <label htmlFor="name">What's the first one's name?</label>
        <input type="text" name="name" id="name"
          onChange={this.prompt2answer.bind(this)} value={value}
          autoComplete='off'
        />
      </p>
    ]
  }

  prompt2answer(e) {
    this.setState({name: e.target.value})
    this.setState({
      prompts: [
        this.prompt1('yes'),
        this.prompt2(e.target.value),
        this.prompt3({name: e.target.value})
      ]
    })
  }

  prompt3({name, date}) {
    return [
      <p key="prompt3A">
        <label htmlFor="date">When was {name} born?</label>
        <input type="date" required className="form-control" id="date" autoComplete='off'
          onChange={this.prompt3answer.bind(this)} value={date}
        />
      </p>
    ]
  }

  prompt3answer(e) {
    this.setState({
      date: e.target.value,
      prompts: [
        this.prompt1('yes'),
        this.prompt2(this.state.name),
        this.prompt3({name: this.state.name, date: e.target.value}),
        this.saveButton()
      ]
    })
  }

  saveButton() {
    return <button key="saveButton" type="submit" className="brand">
      Next Question !
    </button>
  }

  save(e) {
    e.preventDefault()
    this.props.onSave({
      emoji: ':baby_bottle:',
      title: `Sibling ${this.state.name} born`,
      date: this.state.date,
    })
  }
}

Relationship.propTypes = {
  onSave: React.PropTypes.func,
}

export default Relationship
