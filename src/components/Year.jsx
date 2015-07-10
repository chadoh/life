import React from 'react';
import ReactMixin from 'react-mixin';
import Week from './Week';
import { Range } from 'immutable';
// import EventStore from '../stores/EventStore';

export default class Year extends React.Component {
  render() {
    return (
      <tr>
        {
          Range(0,52).map(i => (
            <Week key={i} age={this.props.age} weekno={i}/>
          )).toJS()
        }
      </tr>
    );
  }
}

ReactMixin(Year.prototype, React.addons.PureRenderMixin);
