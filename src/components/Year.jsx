import React from 'react';
import Week from './Week';

export default class Year extends React.Component {
  render() {
    var weekStart = new Date(this.props.start.getTime());
    var yearEnd = new Date(weekStart.getFullYear() + 1, weekStart.getMonth(), weekStart.getDate());
    var weeks = [];
    while (weekStart < yearEnd) {
      let weekEnd = this.addDaysTo(weekStart, 7, yearEnd);
      weeks.push(
        <Week key={weekStart} start={weekStart} end={weekEnd} events={this.eventsFor(weekStart, weekEnd)}/>
      )
      weekStart = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 7);
    }

    return (
      <div>
        {weeks}
      </div>
    );
  }

  eventsFor(start, end) {
    return this.props.events.filter(e => e.get('date') >= start && e.get('date') < end);
  }

  addDaysTo(date, days, notAfter) {
    let d = new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)
    if (d < notAfter) return d
    else return notAfter
  }
}
