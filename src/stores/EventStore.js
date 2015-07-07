import {EVENTS_GET} from '../constants/EventConstants';
import BaseStore from './BaseStore';
import UserStore from './UserStore';

class EventStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._userEvents = [];
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case EVENTS_GET:
        this._userEvents = this.castDates(action.events);
        this.emitChange();
        break;
      default:
        break;
    };
  }

  castDates(events) {
    return events.map(e => {
      e.date = new Date(e.date.split('-'));
      return e;
    })
  }

  makeDateFrom(someString) {
    return new Date(someString.split('-').map(x => parseInt(x)))
  }

  _calculatedEvents() {
    if (UserStore.user.id) return this._userBirthdays()
    else return []
  }

  _userBirthdays() {
    var birthdays = [];
    birthdays.push({ summary: "It's a baby!", emoji: 'baby', date: UserStore.user.born })
    for (var i = 1; i < 100; i++) {
      birthdays.push({
        summary: 'Happy Birthday #' + i,
        emoji: 'birthday',
        date: this._addYearsTo(UserStore.user.born, i)
      });
    }
    birthdays.push({ summary: 'Happy Birthday #100', emoji: '100', date: this._addYearsTo(UserStore.user.born, 100)})
    return birthdays;
  }

  _addYearsTo(date, years) {
    return new Date(date.getFullYear() + years, date.getMonth(), date.getDate())
  }

  get events() {
    return this._userEvents.concat(this._calculatedEvents());
  }

  get eventsByYear() {
    let grouped = {};
    this.events.forEach(e => {
      if (grouped[e.date.getFullYear()]) grouped[e.date.getFullYear()].push(e)
      else grouped[e.date.getFullYear()] = [e]
    })
    return grouped
  }
}

export default new EventStore();
