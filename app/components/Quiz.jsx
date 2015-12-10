import React from 'react'
import merge from 'webpack-merge'
import {Link} from 'react-router'
import connectToStores from 'alt/utils/connectToStores'

import Question1 from './quiz/Question1'
import Question2 from './quiz/Question2'
import Question3 from './quiz/Question3'
import LifeLoading from './LifeLoading'
import LoginStore from '../stores/LoginStore'
import EventService from '../services/EventService'


@connectToStores
class Quiz extends React.Component {
  static getStores() {
    return [LoginStore]
  }

  static getPropsFromStores() {
    return {
      user: LoginStore.getState().user,
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      answers: {},
    }

    this.save = this.save.bind(this)
  }

  componentDidMount() {
    if(!this.props.user.slug) {
      this.props.history.replaceState(null, "/")
    }
  }

  componentDidUpdate() {
    if(!this.props.user.slug) {
      this.props.history.replaceState(null, "/")
    }
  }

  currentQuestion() {
    return +this.props.location.query.n || 0;
  }

  updateAnswers({questionNumber, ...opts}) {
    let answers = this.state.answers;
    answers[questionNumber] = {...opts};
    this.setState({answers})
  }

  nextUnanswered() {
    for (let i = 0; i < this.props.questions.length; i++) {
      if(!this.state.answers[i]) return i;
    }
  }

  save({emoji, title, date} = {}) {
    const questionNumber = this.currentQuestion();
    this.updateAnswers(merge(arguments[0], {questionNumber}))
    this.props.history.pushState(null, '/quiz', {n: this.nextUnanswered()})

    if(!title) return setTimeout(this.possiblyFinishQuiz.bind(this), 100);

    EventService.create({slug: this.props.user.slug, emoji, title, date}).
      then(response => {
        let {id, emoji, title, date, weekno} = response.event;
        this.updateAnswers({questionNumber, id, emoji, title, date, weekno})
        this.possiblyFinishQuiz()
      })
  }

  possiblyFinishQuiz() {
    if(this.currentQuestion() === this.props.questions.length - 1) {
      this.props.history.pushState(null, `/${this.props.user.slug}`, {tour: true})
    }
  }

  skipQuestion(e) {
    e.preventDefault()
    this.save({emoji: ':x:'})
  }

  skipLink() {
    return <p key="skip">
      <Link to='/quiz' query={{n: this.nextUnanswered() + 1}}
        onClick={this.skipQuestion.bind(this)} className="close-link"
      >
        <small>Skip this question</small>
      </Link>
    </p>
  }

  render() {
    return (
      <div className="hero sunset-cliffs">
        <div className="vertical-centering container">
          <div className="bg-tint">
            {React.cloneElement(
              this.props.questions[this.currentQuestion()], {
                onSave: this.save,
                user: this.props.user,
                skip: this.skipLink.bind(this),
            })}
          </div>
        </div>
      </div>
    )
  }
}

Quiz.propTypes = {
  questions: React.PropTypes.array,
}

Quiz.defaultProps = {
  questions: [
    <Question1/>,
    <Question2/>,
    <Question3/>,
    <LifeLoading/>,
  ]
}

export default Quiz
