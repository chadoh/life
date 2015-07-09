import React from 'react';
import ReactMixin from 'react-mixin';
import Week from './Week';
import { Range } from 'immutable';

export default class Year extends React.Component {
  render() {
    let yearEnd = new Date(this.props.start.getFullYear() + 1, this.props.start.getMonth(), this.props.start.getDate());
    let weeks = Range(0,53).map(i => {
      let start = new Date(this.props.start.getFullYear(), this.props.start.getMonth(), this.props.start.getDate() + i*7);
      let end = this.addDaysTo(start, 7, yearEnd);
      return (
        <Week
          key={i}
          start={start}
          end={end}
          events={this.eventsFor(start, end)}
        />
      )
    }).toJS()

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
    return d < notAfter ? d : notAfter
  }
}

ReactMixin(Year.prototype, React.addons.PureRenderMixin);
