import {EVENTS_GET, EVENT_CREATE, EVENT_DESTROY} from '../constants/EventConstants';
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
      case EVENT_CREATE:
        this._userEvents = this._userEvents.concat(this.makeImmutable([action.event]))
        this.emitChange();
        break;
      case EVENT_DESTROY:
        this._userEvents = this._userEvents.filter(e => e.get('id') !== action.id)
        this.emitChange();
        break;
      default:
        break;
    };
  }

  makeImmutable(events) {
    return List(
      events.map(e => Map(e))
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
      date: this.addYearsTo(UserStore.user.get('born'), i)
    }))
  }

  addYearsTo(dateStr, years) {
    let parts = dateStr.split('-');
    return `${parseInt(parts[0]) + years}-${parts[1]}-${parts[2]}`
  }

  get events() {
    return this._userEvents.concat(this._calculatedEvents);
  }

  eventsForWeek(start) {
    return [this.events.first()]
  }
  eventsFor(start, end) {
    return this.events.filter(e => e.get('date') >= start && e.get('date') < end);
  }
}

export default new EventStore();
