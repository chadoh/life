import React from 'react';
import ReactMixin from 'react-mixin';
import Emoji from 'node-emoji';
import UserStore from '../stores/UserStore';
import { Link } from 'react-router';

export default class Week extends React.Component {
  render() {
    // var now = new Date();
    // var classes = ["week"];
    // if ("2015-07-09" > this.props.start) classes.push("past");
    return (
      <td title={UserStore.dateOf(this.props.age, this.props.weekno).toDateString()}>{this.props.weekno}</td>
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
