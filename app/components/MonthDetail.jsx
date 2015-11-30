import React from 'react'
import UserStore from '../stores/UserStore'
import EventStore from '../stores/EventStore'
import Week from './Week'
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
    let weeks = [];
    for(let i=0; i < 4; i++) {
      const weekno = +this.props.params.monthno*4 + i
      const start = UserStore.dateOf(weekno);
      weeks.push(<li key={i}>
        <Week weekno={weekno} events={EventStore.getState().getIn(['events', ''+weekno])}/>
        <Link to={`/${UserStore.getState().getIn(['user', 'slug'])}/week/${weekno}`}>
          Week of {start.toDateString()}
        </Link>
      </li>)
    }
    return weeks;
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
              "Month" of {this.start().toDateString().substr(4)}<br/>
              <small>{Math.floor(+this.props.params.monthno/13)} years old</small>
            </h1>
            <ol className="weeks">
              {this.renderWeeks()}
            </ol>
          </aside>
        }
      </div>
    )
  }
}
