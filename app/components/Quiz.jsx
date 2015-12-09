import React from 'react'
import merge from 'webpack-merge'
import {Link} from 'react-router'
import connectToStores from 'alt/utils/connectToStores'

import Question1 from './quiz/Question1'
import LifeLoading from './LifeLoading'
import LoginStore from '../stores/LoginStore'
import EventService from '../services/EventService'


@connectToStores
class Quiz extends React.Component {
  static getStores() {
    return [LoginStore]
  }

  static getPropsFromStores() {
    return LoginStore.getState().user
  }

  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      currentQuestion: 0,
    }

    this.save = this.save.bind(this)
  }

  componentDidMount() {
    if(!this.props.slug) {
      this.props.history.replaceState(null, "/")
    }
  }

  componentDidUpdate() {
    if(!this.props.slug) {
      this.props.history.replaceState(null, "/")
    }
  }

  updateAnswers({questionNumber, id, emoji, title, date, weekno}) {
    let answers = this.state.answers;
    if(answers[questionNumber]) {
      answers[questionNumber] = {id, emoji, title, date, weekno}
    } else {
      answers.push({id, emoji, title, date, weekno})
    }
    this.setState({answers})
  }

  save({emoji, title, date}) {
    const questionNumber = this.state.answers.length;
    this.updateAnswers(merge(arguments[0], {questionNumber: questionNumber}))

    if(!title) return; // question not applicable

    EventService.create({slug: this.props.slug, emoji, title, date}).
      then(response => {
        let {id, emoji, title, date, weekno} = response.event;
        this.updateAnswers({questionNumber, id, emoji, title, date, weekno})
        if(this.state.answers.length === this.props.questions.length - 1) {
          this.props.history.pushState(null, `/${this.props.slug}`, {tour: true})
        }
      })
  }

  render() {
    return (
      <div className="hero sunset-cliffs">
        <div className="vertical-centering container">
          <div className="bg-tint">
            <header>
              <Link to={`/${this.props.slug}`} className="pull-right close-link"><small>Skip this</small></Link>
              <h1 className="brand">Welcome!</h1>
              <small>Now answer a few quick questions to make your calendar more fun!</small>
            </header>

            {React.cloneElement(
              this.props.questions[this.state.currentQuestion], {
                onSave: this.save,
                user: this.props,
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
    <LifeLoading/>,
  ]
}

export default Quiz
