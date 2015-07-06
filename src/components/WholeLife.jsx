import React from 'react';
import Year from './Year';

export default class User extends React.Component {
  render() {
    var years = [],
        born = this.props.user.born;

    for(var i=0; i<=100; i++) {
      years.push(
        <Year
          key={i}
          birthYear={born.getFullYear()}
          start={new Date(born.getFullYear() + i, born.getMonth(), born.getDate())}
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
