import React from 'react'

class Question2 extends React.Component {
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
        Do you have any children?
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
        <label style={{minWidth: 200}}>
          <input type="radio" name="prompt1" value="someday"
            onChange={this.prompt1answer3.bind(this)} checked={value === "someday"}/>
          <span className="checkable">No, but I plan to!</span>
        </label>
      </p>
    ]
  }

  prompt1answer1() {
    this.setState({prompts: [this.prompt1('yes'), this.prompt2A()]})
  }

  prompt1answer2() {
    this.setState({prompts: [this.prompt1('no')]})
    this.props.onSave({emoji: ':x:'})
  }

  prompt1answer3() {
    this.setState({
      title: "Start having kids",
      prompts: [this.prompt1('someday'), this.prompt2B()]
    })
  }

  prompt2A(value) {
    return [
      <p key="prompt2A">
        <label htmlpFor="name">What's your first child's name?</label>
        <input type="text" name="name" id="name"
          onChange={this.prompt2Aanswer.bind(this)} value={value}
          autoComplete='off'
        />
      </p>
    ]
  }

  prompt2Aanswer(e) {
    this.setState({
      childName: e.target.value,
      prompts: [
        this.prompt1('yes'),
        this.prompt2A(e.target.value),
        this.prompt3A({name: e.target.value})
      ]
    })
  }

  prompt3A({name, date}) {
    return [
      <p key="prompt3A">
        <label htmlFor="date">When was {name} born?</label>
        <input type="date" required className="form-control" id="date" autoComplete='off'
          onChange={this.prompt3Aanswer.bind(this)} value={date}
        />
      </p>
    ]
  }

  prompt3Aanswer(e) {
    this.setState({
      date: e.target.value,
      prompts: [
        this.prompt1('yes'),
        this.prompt2A(this.state.childName),
        this.prompt3A({name: this.state.childName, date: e.target.value}),
        this.saveButton()
      ]
    })
  }

  prompt2B(date) {
    return [
      <p key="prompt2B">
        <label htmlpFor="name">When do you plan to start?</label>
        <input type="date" required className="form-control" id="date" autoComplete='off'
          onChange={this.prompt2Banswer.bind(this)} value={date}
        />
      </p>
    ]
  }

  prompt2Banswer(e) {
    this.setState({
      date: e.target.value,
      prompts: [
        this.prompt1('someday'),
        this.prompt2B(e.target.value),
        this.saveButton(),
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

Question2.propTypes = {
  onSave: React.PropTypes.func,
}

export default Question2
