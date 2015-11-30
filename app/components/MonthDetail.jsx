import React from 'react'
import ReactMixin from 'react-mixin'
import UserStore from '../stores/UserStore'
import LoginStore from '../stores/LoginStore'
import EventStore from '../stores/EventStore'
import Event from './Event'
import { Range } from 'immutable'
import { Link } from 'react-router'

export default class MonthDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: null,
    }
    this._onChange = this._onChange.bind(this)
    this.renderWeeks = this.renderWeeks.bind(this)
  }

  componentWillMount() {
    EventStore.listen(this._onChange)
  }

  componentDidMount() {
    if (!this.state.events) this._onChange()
    document.body.className = document.body.className + ' noscroll-monthdetail'
  }

  componentWillUnmount() {
    EventStore.unlisten(this._onChange)
    document.body.className = document.body.className.replace(/ noscroll-monthdetail/, '')
  }

  _onChange() {
    this.setState({events: EventStore.eventsForMonth(+this.props.params.monthno)})
  }

  renderWeeks() {
    return null
  }

  start() {
    return UserStore.dateOf(+this.props.params.monthno * 4);
  }

  render() {
    return (
      <div className="week-detail-wrap">
        <Link to={`/${this.props.params.slug}`} className="close-week-detail">close</Link>
        {!UserStore.getState().getIn(['user', 'born']) ? '' :
          <aside className="week-detail">
            <h1 className="brand">
              Month of {this.start().toDateString()}<br/>
              <small>{Math.floor(+this.props.params.monthno/13)} years old</small>
            </h1>
            {this.renderWeeks()}
          </aside>
        }
      </div>
    )
  }
}
