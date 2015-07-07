import React from 'react';
import emoji from 'node-emoji';

export default class User extends React.Component {
  render() {
    var start = this.props.start;
    var end = new Date(start.getFullYear() + 1, start.getMonth(), start.getDate());
    var now = new Date();
    var weeks = [
      <div className="week past" data-tooltip={start.toDateString()}>
        {this.firstWeekEmoji()}
      </div>
    ];
    while (start < end) {
      var classes = ["week"];
      if (now > start) classes.push("past")
      else classes.push("future")
      weeks.push(
        <div key={start} className={classes.join(' ')} data-tooltip={start.toDateString()}>
          <span className="placeholder"></span>
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

  firstWeekEmoji() {
    if (this.props.birthYear === this.props.start.getFullYear()) return emoji.get('baby')
    else if (this.props.birthYear + 100 === this.props.start.getFullYear()) return emoji.get('100')
    else return emoji.get('birthday')
  }
}
