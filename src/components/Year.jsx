import React from 'react';
import ReactMixin from 'react-mixin';
import Week from './Week';
import { Range } from 'immutable';
// import EventStore from '../stores/EventStore';

export default class Year extends React.Component {
  render() {
    // let start = EventStore.addYearsTo(this.props.birthDate, this.props.age)
    // let end = EventStore.addYearsTo(this.props.birthDate, this.props.age + 1)
    // let weeks = Range(0,53).map(i => {
    //   return (
    //     <Week
    //       key={i}
    //       start={this.props.birthDate}
    //       end={this.props.birthDate}
    //       events={List()}
    //     />
    //   )
    // }).toJS()

    return (
      <tr>
        {
          Range(0,53).map(j => (
            <Week key={j} weekno={j}/>
          )).toJS()
        }
      </tr>
    );
  }

  // eventsFor(start, end) {
  //   return this.props.events.filter(e => e.get('date') >= start && e.get('date') < end);
  // }
  //
  // addDaysTo(date, days, notAfter) {
  //   let d = new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)
  //   return d < notAfter ? d : notAfter
  // }
}

ReactMixin(Year.prototype, React.addons.PureRenderMixin);
