import React from 'react';
import ReactMixin from 'react-mixin';
import Year from './Year';
import UserStore from '../stores/UserStore';

export default class WholeLife extends React.Component {
  render() {
    var years = [],
        born = UserStore.user.get('born');

    for(var i=0; i<=100; i++) {
      let year = born.getFullYear() + i;
      years.push(
        <Year
          key={i}
          birthYear={born.getFullYear()}
          events={this.props.events.get(year)}
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
