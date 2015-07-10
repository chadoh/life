import React from 'react';
import ReactMixin from 'react-mixin';
import Year from './Year';
// import UserStore from '../stores/UserStore';
// import EventStore from '../stores/EventStore';
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
    return (
      <table className="life">
        {
          Range(0,101).map(i => (
            <Year key={i} age={i} />
          )).toJS()
        }
      </table>
    );
  }
}

ReactMixin(WholeLife.prototype, React.addons.PureRenderMixin);
