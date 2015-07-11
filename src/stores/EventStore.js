import {EVENTS_GET, EVENT_CREATE, EVENT_DESTROY} from '../constants/EventConstants';
import BaseStore from './BaseStore';
import Immutable from 'immutable';

class EventStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._events = Immutable.Map();
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case EVENTS_GET:
        this._events = Immutable.fromJS(action.events);
        this.emitChange();
        break;
      case EVENT_CREATE:
        debugger;
        // this._events = this._events.concat(this.makeImmutable([action.event]))
        this.emitChange();
        break;
      case EVENT_DESTROY:
        debugger;
        // this._events = this._events.filter(e => e.get('id') !== action.id)
        this.emitChange();
        break;
      default:
        break;
    };
  }

  get events() {
    return this._events;
  }
}

export default new EventStore();
