import React from 'react';
import Year from './Year';

export default class WholeLife extends React.Component {
  render() {
    var years = [],
        born = this.props.user.born;

    for(var i=0; i<=100; i++) {
      let year = born.getFullYear() + i;
      years.push(
        <Year
          key={i}
          birthYear={born.getFullYear()}
          events={this.props.events[year]}
          start={new Date(year, born.getMonth(), born.getDate())}
        />
      )
    }
    return (
      <div>
        {years}
      </div>
    );
  }
}
