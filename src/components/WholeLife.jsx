import React from 'react';
import ReactMixin from 'react-mixin';
import Week from './Week';

export default class WholeLife extends React.Component {
  render() {
    var weeks = [];
    for(var i = 0; i < 101*52; i++) {
      weeks.push(<Week key={i} weekno={i} events={this.props.events.get(''+i)} />)
    }
    return (
      <div className="life">
        {weeks}
      </div>
    );
  }
}

ReactMixin(WholeLife.prototype, React.addons.PureRenderMixin);
