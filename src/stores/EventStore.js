import {EVENTS_GET} from '../constants/EventConstants';
import BaseStore from './BaseStore';
import UserStore from './UserStore';
import { Map, List, Range } from 'immutable';

class EventStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._userEvents = List();
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case EVENTS_GET:
        this._userEvents = this.makeImmutable(action.events);
        this.emitChange();
        break;
      default:
        break;
    };
  }

  makeImmutable(events) {
    return List(
      events.map(e => Map(e).update('date', str => new Date(str.split('-')) ))
    )
  }

  get _calculatedEvents() {
    return this.userBirthdays
  }

  get userBirthdays() {
    if (!UserStore.user.get('born')) return List();
    else {
      if (this._userBirthdays) return this._userBirthdays;
      this._userBirthdays = this.calculateBirthdays;
      return this._userBirthdays
    }
  }

  get calculateBirthdays() {
    return Range(0,101).map(i => Map({
      summary: i === 0 ? "It's a baby!" : `Happy Birthday #${i}`,
      emoji: i === 0 ? "baby" : i === 100 ? "100" : "birthday",
      date: this._addYearsTo(UserStore.user.get('born'), i)
    }))
  }

  _addYearsTo(date, years) {
    return new Date(date.getFullYear() + years, date.getMonth(), date.getDate())
  }

  get events() {
    return this._userEvents.concat(this._calculatedEvents);
  }

  get eventsByYear() {
    return this.events.groupBy(event => event.get('date').getFullYear());
  }

  eventsFor(start, end) {
    return this.events.filter(e => e.get('date') >= start && e.get('date') < end);
  }
}

export default new EventStore();
