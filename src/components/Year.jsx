import React from 'react';
import emoji from 'node-emoji';
import EventStore from '../stores/EventStore';

export default class User extends React.Component {
  render() {
    var start = this.props.start;
    var end = new Date(start.getFullYear() + 1, start.getMonth(), start.getDate());
    var now = new Date();
    var weeks = [];
    while (start < end) {
      var classes = ["week"];
      if (now > start) classes.push("past");
      weeks.push(
        <div key={start} className={classes.join(' ')}>
          {this.emojiForWeek(start, end)}
        </div>
      )
      start = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 7);
    }

    return (
      <div>
        {weeks}
      </div>
    );
  }

  emojiForWeek(weekStart, notAfter) {
    var events = EventStore.eventsForWeek(weekStart, notAfter);
    if (events[0]) return <span data-tooltip={weekStart.toDateString() + ': ' + events[0].summary}>
                            {emoji.get(events[0].emoji)}
                          </span>
    else return <span className="placeholder" data-tooltip={weekStart.toDateString()}></span>
  }
}
