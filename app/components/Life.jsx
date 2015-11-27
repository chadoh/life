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

export default class Life extends React.Component {
  componentDidMount() {
    this.props.addSteps([{
      title: 'Welcome to the world!',
      text: 'This baby emoji represents the week you were born. Once this tour is over, you can mouse over it to see the date.',
      selector: '.year:first-child a:first-child',
      position: 'bottom',
    }, {
      title: 'Your first year',
      text: 'Each row represents one year of your life. For this whole first row, you were 0 years old. Cute little you, just squirming & watching & learning.',
      selector: '.year:first-child',
      position: 'bottom',
    }, {
      title: '100 trips around the sun!',
      text: "You can make it to 100 years old, right? It'll be awesome!",
      selector: '.year:last-child a:first-child',
      position: 'top',
    }, {
      title: "You're here now",
      text: "Welcome! This is a good place to be.",
      selector: 'a.now',
      position: 'top',
    }, {
      title: "What happened last week?",
      text: "Anything cool? Anything that will make ripples across your entire future? Probably! Click on a week to add events (and emojis) to your life calendar. Get started by adding the best day of your life!",
      selector: 'a.last-week',
      position: 'top',
    }])
    if(this.props.showTour) this.props.startTour();
  }

  render() {
    let years = []
    for(var i = 0; i < 101; i++) {
      years.push(<Year key={i} events={this.props.events} age={i}/>)
    }
    return (
      <div className="life">
        {years}
      </div>
    );
  }
}
