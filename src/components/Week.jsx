import React from 'react';
import ReactMixin from 'react-mixin';
import Emoji from 'node-emoji';
import UserStore from '../stores/UserStore';
import EventStore from '../stores/EventStore';
import { Link } from 'react-router';

export default class Week extends React.Component {
  render() {
    let start = UserStore.dateOf(this.props.weekno);
    return (
      <a data-tooltip={start.toDateString()} href={`week/${start.toISOString().replace(/T.+/, '')}`}>
        {this.props.weekno % 52}
      </a>
    )
  }

  // emojiFor(events) {
  //   let tooltip = this.props.start;
  //   let emoji = <span className="placeholder"/>;
  //   if (events.first()) {
  //     tooltip = `${tooltip}: ${events.first().get('summary')}`;
  //     emoji = Emoji.get(events.first().get('emoji'));
  //   }
  //   return (
  //     <span data-tooltip={tooltip}>
  //       <Link to="week" params={{slug: UserStore.user.get('slug'), start: this.props.start, end: this.props.end}}>
  //         {emoji}
  //       </Link>
  //     </span>
  //   )
  // }
}

ReactMixin(Week.prototype, React.addons.PureRenderMixin);
