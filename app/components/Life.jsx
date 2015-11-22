import React from 'react';
import Week from './Week';

const weeksFor = ({age, events}) => {
  let weeks = [];
  for(var i = 0; i < 52; i++) {
    const weekno = age * 52 + i;
    weeks.push(<Week key={weekno} weekno={weekno} events={events.get(''+weekno)} />)
  }
  return weeks;
}

const Year = ({age, events}) => {
  return (
    <div className="year">{weeksFor({age, events})}</div>
  )
}

export default ({events}) => {
  let years = []
  for(var i = 0; i < 101; i++) {
    years.push(<Year key={i} events={events} age={i}/>)
  }
  return (
    <div className="life">
      {years}
    </div>
  );
}
