import React from 'react'

class Question1 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      prompts: [this.prompt1()]
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
        Do you have any children?
      </p>,
      <p key="answer1" className="horizontal-spacing">
        <label style={{minWidth: 200}}>
          <input type="radio" name="prompt1" value="yes"
            onChange={this.prompt1answer1.bind(this)} checked={value === "yes"}/>
          <span className="checkable">Yes</span>
        </label>
      </p>
    ]
  }

  prompt1answer1(e) {
    this.setState({prompts: [this.prompt1('yes'), this.prompt2()]})
  }

  prompt2(value) {
    return [
      <p key="prompt2">
        <label htmlpFor="name">What's your firstborn's name?</label>
        <input type="text" name="name" id="name"
          onChange={this.prompt2answer.bind(this)} value={value}
          autoComplete='off'
        />
      </p>
    ]
  }

  prompt2answer(e) {
    this.setState({
      childName: e.target.value,
      prompts: [
        this.prompt1('yes'),
        this.prompt2(e.target.value),
        this.prompt3({name: e.target.value})
      ]
    })
  }

  prompt3({name, date}) {
    return [
      <p key="prompt3">
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
        this.prompt2(this.state.childName),
        this.prompt3({name: this.state.childName, date: e.target.value}),
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
      emoji: ':baby:',
      title: this.title(),
      date: this.state.date,
    })
  }

  title() {
    if(this.state.title) return this.state.title;
    else if(this.state.childName) return `${this.state.childName} born!`;
  }
}

Question1.propTypes = {
  onSave: React.PropTypes.func,
  user: React.PropTypes.shape({
    born: React.PropTypes.string
  }),
}

export default Question1
