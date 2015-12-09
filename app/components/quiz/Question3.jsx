import React from 'react'

class Question3 extends React.Component {
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
        Are you married?
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
    this.setState({prompts: [this.prompt1('yes'), this.prompt2A()]})
  }

  prompt1answer2() {
    this.setState({prompts: [this.prompt1('no'), this.prompt2B()]})
  }

  prompt2A(value) {
    return [
      <p key="prompt2A">
        <label htmlFor="name">To whom?</label>
        <input type="text" name="name" id="name"
          onChange={this.prompt2Aanswer.bind(this)} value={value}
          autoComplete='off'
        />
      </p>
    ]
  }

  prompt2Aanswer(e) {
    this.setState({
      spouseName: e.target.value,
      prompts: [
        this.prompt1('yes'),
        this.prompt2A(e.target.value),
        this.prompt3A()
      ]
    })
  }

  prompt3A(date) {
    return [
      <p key="prompt3A">
        <label htmlFor="date">When was your wedding?</label>
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
        this.prompt2A(this.state.spouseName),
        this.prompt3A(e.target.value),
        this.saveButton()
      ]
    })
  }

  prompt2B(value) {
    return [
      <p key="prompt2B">
        In a serious relationship?
      </p>,
      <p key="answer1" className="horizontal-spacing">
        <label style={{minWidth: 200}}>
          <input type="radio" name="prompt1" value="yes"
            onChange={this.prompt2Banswer1.bind(this)} checked={value === "yes"}/>
          <span className="checkable">Yes</span>
        </label>
        <label style={{minWidth: 200}}>
          <input type="radio" name="prompt1" value="no"
            onChange={this.prompt2Banswer2.bind(this)} checked={value === "no"}/>
          <span className="checkable">No</span>
        </label>
      </p>
    ]
  }

  prompt2Banswer1() {
    this.setState({
      prompts: [
        this.prompt1('no'),
        this.prompt2B('yes'),
        this.prompt3B(),
      ]
    })
  }

  prompt2Banswer2(e) {
    this.setState({prompts: [
      this.prompt1('no'),
      this.prompt2B('no')
    ]})
    this.save(e)
  }

  prompt3B(value) {
    return [
      <p key="prompt2A">
        <label htmlFor="name">What's your partner's name?</label>
        <input type="text" name="name" id="name"
          onChange={this.prompt3Banswer.bind(this)} value={value}
          autoComplete='off'
        />
      </p>
    ]
  }

  prompt3Banswer(e) {
    this.setState({
      partnerName: e.target.value,
      prompts: [
        this.prompt1('no'),
        this.prompt2B('yes'),
        this.prompt3B(e.target.value),
        this.prompt4B(),
      ]
    })
  }

  prompt4B(date) {
    return [
      <p key="prompt3A">
        <label htmlFor="date">When did you start dating?</label>
        <input type="date" required className="form-control" id="date" autoComplete='off'
          onChange={this.prompt4Banswer.bind(this)} value={date}
        />
      </p>
    ]
  }

  prompt4Banswer(e) {
    this.setState({
      date: e.target.value,
      prompts: [
        this.prompt1('no'),
        this.prompt2B('yes'),
        this.prompt3B(this.state.partnerName),
        this.prompt4B(e.target.value),
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
      emoji: this.emoji(),
      title: this.title(),
      date: this.state.date,
    })
  }

  emoji() {
    if(this.state.spouseName) return ':bride_with_veil:';
    else return ':heartbeat:'
  }
  title() {
    if(this.state.spouseName) return `Married ${this.state.spouseName}`;
    else if(this.state.partnerName) return `Started dating ${this.state.partnerName}`;
  }
}

Question3.propTypes = {
  onSave: React.PropTypes.func,
  user: React.PropTypes.shape({
    born: React.PropTypes.string
  }),
}

export default Question3
