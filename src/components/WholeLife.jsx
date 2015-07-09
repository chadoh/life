import React from 'react';
import ReactMixin from 'react-mixin';
import Year from './Year';
import UserStore from '../stores/UserStore';
import EventStore from '../stores/EventStore';
import { Range, List } from 'immutable';

export default class WholeLife extends React.Component {
  constructor(props) {
    super(props);
    // this.state = this.getState();
    // this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    // EventStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    // EventStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    // this.setState(this.getState());
  }

  getState() {
    // return {events: EventStore.events};
  }

  render() {
    var years = Range(0,101).map(i => (
      <Year
        key={i}
        birthDate={UserStore.user.get('born')}
        events={List()}
        age={i}
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
