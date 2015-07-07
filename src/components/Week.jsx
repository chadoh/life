import React from 'react';
import emoji from 'node-emoji';
import EventStore from '../stores/EventStore';

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
    if (events[0]) return (
      <span data-tooltip={this.props.start.toDateString() + ': ' + events[0].summary}>
        {emoji.get(events[0].emoji)}
      </span>
    )
    else return <span className="placeholder" data-tooltip={this.props.start.toDateString()}></span>
  }
}
