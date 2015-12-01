import React from 'react'
import LoginStore from '../stores/LoginStore'
import UserStore from '../stores/UserStore'
import EventStore from '../stores/EventStore'
import Week from './Week'
import Events from './Events'
import { Link } from 'react-router'

export default class MonthDetail extends React.Component {
  constructor(props) {
    super(props)
    this.renderWeeks = this.renderWeeks.bind(this)
  }

  componentDidMount() {
    document.body.className = document.body.className + ' noscroll-monthdetail'
  }

  componentWillUnmount() {
    document.body.className = document.body.className.replace(/ noscroll-monthdetail/, '')
  }

  renderWeeks() {
    let weeks = [];
    for(let i=0; i < 4; i++) {
      const weekno = +this.props.params.monthno*4 + i
      const start = UserStore.dateOf(weekno);
      const events = EventStore.getState().getIn(['events', ''+weekno]);
      weeks.push(<li key={i}>
        <h3>
          <Link to={`/${UserStore.getState().getIn(['user', 'slug'])}/week/${weekno}`}>
            Week of {start.toDateString()}
          </Link>
        </h3>
        <Events events={events} slug={this.props.slug} weekno={weekno}
          authed={LoginStore.canEdit(UserStore.getState().get('user'))}
        />
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
            <h1 className="brand">Month of {this.start().toDateString().substr(4)}</h1>
            {Math.floor(+this.props.params.monthno/13)} years old
            <ol className="weeks">
              {this.renderWeeks()}
            </ol>
          </aside>
        }
      </div>
    )
  }
}
