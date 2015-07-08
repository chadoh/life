import React from 'react';
import Emoji from 'node-emoji';
import EventStore from '../stores/EventStore';
import UserStore from '../stores/UserStore';
import { Link } from 'react-router';

export default class Week extends React.Component {
  render() {
    var now = new Date();
    var classes = ["week"];
    if (now > this.props.start) classes.push("past");
    return (
      <div className={classes.join(' ')}>
        {this.emojiFor(this.props.events)}
      </div>
    )
  }

  emojiFor(events) {
    let tooltip = this.props.start.toDateString();
    let emoji = <span className="placeholder"/>;
    if (events[0]) {
      tooltip = `${tooltip}: ${events[0].summary}`;
      emoji = Emoji.get(events[0].emoji);
    }
    return (
      <span data-tooltip={tooltip}>
        <Link to="week" params={{slug: UserStore.user.get('slug'), start: this.dateParam(this.props.start), end: this.dateParam(this.props.end)}}>
          {emoji}
        </Link>
      </span>
    )
  }

  dateParam(date) {
    return date.toJSON().split('T')[0]
  }
}
