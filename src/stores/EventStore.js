import {EVENTS_GET, EVENT_CREATE, EVENT_DESTROY} from '../constants/EventConstants';
import BaseStore from './BaseStore';
import Immutable from 'immutable';

class EventStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._userEvents = Immutable.Map();
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case EVENTS_GET:
        this._userEvents = Immutable.fromJS(action.events);
        this.emitChange();
        break;
      case EVENT_CREATE:
        debugger;
        // this._userEvents = this._userEvents.concat(this.makeImmutable([action.event]))
        this.emitChange();
        break;
      case EVENT_DESTROY:
        debugger;
        // this._userEvents = this._userEvents.filter(e => e.get('id') !== action.id)
        this.emitChange();
        break;
      default:
        break;
    };
  }

  get events() {
    return this._userEvents;
  }
}

export default new EventStore();
