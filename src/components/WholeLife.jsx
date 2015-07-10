import React from 'react';
import ReactMixin from 'react-mixin';
import Week from './Week';
// import UserStore from '../stores/UserStore';
import EventStore from '../stores/EventStore';

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
    var weeks = [];
    for(var i = 0; i < 101*52; i++) {
      weeks.push(<Week key={i} weekno={i} events={EventStore.events.get(''+i)} />)
    }
    return (
      <div className="life">
        {weeks}
      </div>
    );
  }
}

ReactMixin(WholeLife.prototype, React.addons.PureRenderMixin);
