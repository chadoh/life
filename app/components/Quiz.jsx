import React from 'react'
import merge from 'webpack-merge'
import {Link} from 'react-router'
import connectToStores from 'alt/utils/connectToStores'

import Question1 from './quiz/Question1'
import Question2 from './quiz/Question2'
import LifeLoading from './LifeLoading'
import LoginStore from '../stores/LoginStore'
import EventService from '../services/EventService'


@connectToStores
class Quiz extends React.Component {
  static getStores() {
    return [LoginStore]
  }

  static getPropsFromStores() {
    return LoginStore.getState()
  }

  constructor(props) {
    super(props);
    this.state = {
      answers: [],
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

  updateAnswers({questionNumber, id, emoji, title, date, weekno}) {
    let answers = this.state.answers;

    if(answers[questionNumber])
      answers[questionNumber] = {id, emoji, title, date, weekno};
    else
      answers.push({id, emoji, title, date, weekno});

    this.setState({answers})
  }

  save({emoji, title, date} = {}) {
    const questionNumber = this.currentQuestion();
    this.updateAnswers(merge(arguments[0], {questionNumber}))
    this.props.history.pushState(null, '/quiz', {n: this.state.answers.length})

    if(!title) return setTimeout(this.possiblyFinishQuiz.bind(this), 100);

    EventService.create({slug: this.props.user.slug, emoji, title, date}).
      then(response => {
        let {id, emoji, title, date, weekno} = response.event;
        this.updateAnswers({questionNumber, id, emoji, title, date, weekno})
        this.possiblyFinishQuiz()
      })
  }

  possiblyFinishQuiz() {
    if(this.props.location.query.n === this.props.questions.length - 1) {
      this.props.history.pushState(null, `/${this.props.user.slug}`, {tour: true})
    }
  }

  render() {
    return (
      <div className="hero sunset-cliffs">
        <div className="vertical-centering container">
          <div className="bg-tint">
            <Link to={`/${this.props.user.slug}`} className="pull-right close-link"><small>Skip this</small></Link>

            {React.cloneElement(
              this.props.questions[this.currentQuestion()], {
                onSave: this.save,
                user: this.props.user,
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
    <LifeLoading/>,
  ]
}

export default Quiz
