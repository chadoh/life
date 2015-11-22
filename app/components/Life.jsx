import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactMixin from 'react-mixin';
import Week from './Week';
import tour from './UserTour';

class Life extends React.Component {

  render() {
    var weeks = [];
    for(var i = 0; i < 101*52; i++) {
      weeks.push(<Week key={i} weekno={i} events={this.props.events.get(''+i)} />)
    }
    return (
      <div style={{clear: 'both'}} className="life" ref="tour">
        {weeks}
      </div>
    );
  }
}

ReactMixin(Life.prototype, PureRenderMixin);

export default tour.withTour(Life)
