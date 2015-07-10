import React from 'react';
import ReactMixin from 'react-mixin';
import Emoji from 'node-emoji';
import UserStore from '../stores/UserStore';

export default class Week extends React.Component {
  render() {
    let start = UserStore.dateOf(this.props.weekno);
    let klass = new Date() > start ? 'past' : '';
    return (
      <a className={klass}
        data-tooltip={this.tooltip(start.toDateString())}
        href={`${UserStore.user.get('slug')}/week/${start.toISOString().replace(/T.+/, '')}`}>
        {this.emoji}
      </a>
    )
  }

  get emoji() {
    return this.props.events ? Emoji.get(this.props.events[0].emoji) : "●"
  }

  tooltip(date) {
    return this.props.events ? `${date}: ${this.props.events[0].summary}` : date
  }
}

ReactMixin(Week.prototype, React.addons.PureRenderMixin);
