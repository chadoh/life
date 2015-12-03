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

  renderWeeks() {
    let weeks = [];
    for(let i=0; i < 4; i++) {
      const weekno = +this.props.params.monthno*4 + i
      const start = UserStore.startOf(weekno);
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
    return UserStore.startOf(+this.props.params.monthno * 4);
  }

  render() {
    if(UserStore.getState().getIn(['user', 'born'])) {
      return (
        <div className="week-detail">
          <div className="container-wide">
            <h1 className="brand">Month of {this.start().toDateString().substr(4)}</h1>
            {Math.floor(+this.props.params.monthno/13)} years old
            <ol className="weeks">
              {this.renderWeeks()}
            </ol>
          </div>
        </div>
      )
    }
  }
}
