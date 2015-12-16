import React from 'react';
import Week from './Week';
import Month from './Month';
import DetailContainer from './DetailContainer';
import IsMobileStore from '../stores/IsMobileStore';
import EventStore from '../stores/EventStore';
import connectToStores from 'alt/utils/connectToStores';
import Immutable from 'immutable';
import tourSteps from '../lib/tourSteps';

@connectToStores
class Life extends React.Component {
  static getStores() {
    return [IsMobileStore];
  }

  static getPropsFromStores() {
    return IsMobileStore.getState();
  }

  constructor(props) {
    super(props)
    this.state = {
      oldWeekno: null,
      oldMonthno: null,
    }
  }

  componentDidMount() {
    this.props.addSteps(tourSteps)
    if(this.props.showTour) setTimeout(this.props.startTour, 100)
  }

  componentWillReceiveProps (newProps) {
    var oldWeekno = this.props.weekno;
    var oldMonthno = this.props.monthno;
    if (oldWeekno && newProps.weekno !== oldWeekno)
      this.setState({oldWeekno: oldWeekno})
    if (oldMonthno && newProps.monthno !== oldMonthno)
        this.setState({oldMonthno: oldMonthno})
  }

  monthsFor({age, events}) {
    let months = [];
    for(var i = 0; i < 13; i++) {
      const monthno = age * 13 + i;

      const selected = +this.props.monthno === monthno ||
        Math.floor(+this.props.weekno/4) === monthno;
      months.push(
        <Month key={monthno} monthno={monthno}
          events={EventStore.eventsForMonth(monthno)}
          selected={selected}
        />
      )
    }
    return months;
  }

  weeksIn(age) {
    if(this.props.user.get('died') && this.endAge() === age)
      return this.finalWeek() % 52
    else
      return 51
  }

  weeksFor({age, events}) {
    let weeks = [];
    for(var i = 0; i <= this.weeksIn(age); i++) {
      const weekno = age * 52 + i;
      const selected = +this.props.weekno === weekno ||
        +this.props.monthno*4 === weekno;
      weeks.push(
        <Week key={weekno} weekno={weekno} events={events.get(''+weekno)}
          selected={selected}
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

  selected({age, weekno, monthno}) {
    if(!weekno && !monthno) return false;

    if(weekno) return (weekno >= age*52) && (weekno < (age+1)*52);
    else return (monthno >= age*13) && (monthno < (age+1)*13);
  }

  renderDetail(age) {
    if(!this.props.detail) return null;

    const hasCurrent = this.selected({age, weekno: this.props.weekno, monthno: this.props.monthno})
    const hadCurrent = this.selected({age, weekno: this.state.oldWeekno, monthno: this.state.oldMonthno})
    const sameRow = hasCurrent && hadCurrent;

    if(hasCurrent) {
      return <DetailContainer>
        {React.cloneElement(
          this.props.detail, { params: {
            slug: this.props.slug,
            weekno: this.props.weekno,
            monthno: this.props.monthno,
        }})}
      </DetailContainer>
    } else if(hadCurrent && !sameRow) {
      return <DetailContainer old={true}>
        {React.cloneElement(
          this.props.detail, { params: {
            slug: this.props.slug,
            weekno: this.state.oldWeekno,
            monthno: this.state.oldMonthno,
        }})}
      </DetailContainer>
    }
  }

  year(age, events) {
    return (
      <div key={age} className="year-wrap">
        <div className={`container-wide year${!this.props.isMobile ? ' in-weeks' : ''}`}>
          <small className="age">{!(age % 5) && age !== 100 ? age : null }</small>
          {this.renderDots({age, events})}
        </div>
        {this.renderDetail(age)}
      </div>
    )
  }

  finalWeek() {
    return this.props.events.keySeq().map(v => +v).sort().last()
  }

  endAge() {
    if(this.props.user.get('died')) {
      return Math.floor(this.finalWeek()/52)
    } else {
      return 101
    }
  }

  render() {
    let years = []
    for(var i = 0; i <= this.endAge(); i++) {
      years.push(this.year(i, this.props.events))
    }
    return (
      <div className="life">
        {years}
      </div>
    );
  }
}

import customPropTypes from '../lib/customPropTypes'

Life.propTypes = {
  events: customPropTypes.requiredMap,
  user: customPropTypes.requiredMap,
  addSteps: React.PropTypes.func,
  showTour: React.PropTypes.bool,
  weekno: React.PropTypes.string,
  monthno: React.PropTypes.string,
  detail: React.PropTypes.element,
}

export default Life
