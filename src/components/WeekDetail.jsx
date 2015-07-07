import React from 'react';
import emoji from 'node-emoji';
import EventStore from '../stores/EventStore';

export default class WeekDetail extends React.Component {
  render() {
    return (
      <div>
        Start: {this.props.params.start}, End: {this.props.params.end}
      </div>
    )
  }
}
