import React from 'react';
import Week from './Week';
import Month from './Month';
import IsMobileStore from '../stores/IsMobileStore';
import EventStore from '../stores/EventStore';
import connectToStores from 'alt/utils/connectToStores';
import Immutable from 'immutable';

@connectToStores
export default class Life extends React.Component {
  static getStores() {
    return [IsMobileStore];
  }

  static getPropsFromStores() {
    return IsMobileStore.getState();
  }

  componentDidMount() {
    this.props.addSteps([{
      title: 'Welcome to the world!',
      text: 'This baby emoji represents the week you were born. Once this tour is over, you can mouse over it to see the date.',
      selector: '.year:first-child a:first-of-type',
      position: 'bottom',
    }, {
      title: 'Your first year',
      text: 'Each row represents one year of your life. For this whole first row, you were 0 years old. Cute little you, just squirming & watching & learning.',
      selector: '.year:first-child',
      position: 'bottom',
    }, {
      title: '100 trips around the sun!',
      text: "You can make it to 100 years old, right? It'll be awesome!",
      selector: '.year:last-child a:first-of-type',
      position: 'top',
    }, {
      title: "You're here now",
      text: "Welcome! This is a good place to be.",
      selector: 'a.now',
      position: 'top',
    }, {
      title: "What happened last week?",
      text: "Anything cool? Anything that will make ripples across your entire future? Probably! Click on a week to add events (and emojis) to your life calendar. Get started by adding the best day of your life!",
      selector: 'a.previous',
      position: 'top',
    }])
    if(this.props.showTour) setTimeout(this.props.startTour, 100)
  }

  monthsFor({age, events}) {
    let months = [];
    for(var i = 0; i < 13; i++) {
      const monthno = age * 13 + i;

      months.push(
        <Month key={monthno} monthno={monthno}
          events={EventStore.eventsForMonth(monthno)}
          selectedMonth={+this.props.monthno}
        />
      )
    }
    return months;
  }

  weeksFor({age, events}) {
    let weeks = [];
    for(var i = 0; i < 52; i++) {
      const weekno = age * 52 + i;
      weeks.push(
        <Week key={weekno} weekno={weekno} events={events.get(''+weekno)}
          selectedWeek={+this.props.weekno}
        />
      )
    }
    return weeks;
  }

  renderDots({age, events}) {
    if(this.props.isMobile)
      return this.monthsFor({age, events})
    else
      return this.weeksFor({age, events})
  }

  isSelected(age) {
    const weekno = this.props.weekno;
    const monthno = this.props.monthno;
    if(!weekno && !monthno) return false;

    if(weekno) return (weekno >= age*52) && (weekno < (age+1)*52);
    else return (monthno >= age*13) && (monthno < (age+1)*13);
  }

  renderDetail(age) {
    if(this.isSelected(age)) {
      return this.props.detail;
    }
  }

  year(age, events) {
    return (
      <div key={age}>
        <div className={`container-wide year${!this.props.isMobile ? ' in-weeks' : ''}`}>
          <small className="age">{!(age % 5) && age !== 100 ? age : null }</small>
          {this.renderDots({age, events})}
        </div>
        {this.renderDetail(age)}
      </div>
    )
  }

  render() {
    let years = []
    for(var i = 0; i < 101; i++) {
      years.push(this.year(i, this.props.events))
    }
    return (
      <div className="life">
        {years}
      </div>
    );
  }
}
