import React from 'react';
import ReactMixin from 'react-mixin';
import Year from './Year';
import UserStore from '../stores/UserStore';
import EventStore from '../stores/EventStore';
import { Range } from 'immutable';

export default class WholeLife extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getState();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    EventStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(this.getState());
  }

  getState() {
    return {events: EventStore.eventsByAge};
  }

  render() {
    var born = UserStore.user.get('born');

    var years = Range(0,101).map(i => (
      <Year
        key={i}
        birthYear={born.getFullYear()}
        events={this.state.events.get(i)}
        start={new Date(born.getFullYear() + i, born.getMonth(), born.getDate())}
      />
    )).toJS();
    return (
      <div>
        {years}
      </div>
    );
  }
}

ReactMixin(WholeLife.prototype, React.addons.PureRenderMixin);
