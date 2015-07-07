import React from 'react';
import Emoji from 'node-emoji';
import UserStore from '../stores/UserStore';
import { Link } from 'react-router';

export default class WholeLife extends React.Component {
  render() {
    var years = [],
        born = this.props.user.born;

    for(var i=0; i<=100; i++) {
      // whole-life-level stuff
      let year = born.getFullYear() + i;


      // year-level stuff
      var weekStart = new Date(year, born.getMonth(), born.getDate())
      var yearEnd = new Date(weekStart.getFullYear() + 1, weekStart.getMonth(), weekStart.getDate());
      var weeks = [];
      while (weekStart < yearEnd) {
        let weekEnd = this.addDaysTo(weekStart, 7, yearEnd);
        let now = new Date();
        let classes = ["week"];
        if (now > weekStart) classes.push("past");

        weeks.push(
          <div className={classes.join(' ')}>
            {this.emojiFor(this.eventsFor(year, weekStart, weekEnd), weekStart, weekEnd)}
          </div>
        )
        weekStart = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 7);
      }



      years.push(
        weeks
        // <Year
        //   key={i}
        //   events={this.props.events[year]}
        //   start={new Date(year, born.getMonth(), born.getDate())}
        // />
      )
    }
    return (
      <div>
        {years}
      </div>
    );
  }

  eventsFor(year, start, end) {
    return this.props.events[year].filter(e => e.date >= start && e.date < end);
  }

  addDaysTo(date, days, notAfter) {
    let d = new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)
    if (d < notAfter) return d
    else return notAfter
  }


  emojiFor(events, start, end) {
    let tooltip = start.toDateString();
    let emoji = <span className="placeholder"/>;
    if (events[0]) {
      tooltip = `${tooltip}: ${events[0].summary}`;
      emoji = Emoji.get(events[0].emoji);
    }
    return (
      <span data-tooltip={tooltip}>
        <Link to="week" params={{slug: UserStore.user.slug, start: this.dateParam(start), end: this.dateParam(end)}}>
          {emoji}
        </Link>
      </span>
    )
  }

  dateParam(date) {
    return date.toJSON().split('T')[0]
  }
}
