import React from 'react';
import ReactMixin from 'react-mixin';
import Year from './Year';
import UserStore from '../stores/UserStore';
import EventStore from '../stores/EventStore';

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
    return {events: EventStore.eventsByYear};
  }

  render() {
    var years = [],
        born = UserStore.user.get('born');

    for(var i=0; i<=100; i++) {
      let year = born.getFullYear() + i;
      years.push(
        <Year
          key={i}
          birthYear={born.getFullYear()}
          events={this.state.events.get(year)}
          start={new Date(year, born.getMonth(), born.getDate())}
        />
      )
    }
    return (
      <div>
        {years}
      </div>
    );
  }
}

ReactMixin(WholeLife.prototype, React.addons.PureRenderMixin);
