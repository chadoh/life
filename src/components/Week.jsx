import React from 'react';
import ReactMixin from 'react-mixin';
import Emoji from 'node-emoji';
import UserStore from '../stores/UserStore';
import EventStore from '../stores/EventStore';
import { Link } from 'react-router';

export default class Week extends React.Component {
  render() {
    let start = UserStore.dateOf(this.props.weekno);
    let klass = new Date() > start ? 'past' : '';
    return (
      <a className={klass}
        data-tooltip={start.toDateString()}
        href={`${UserStore.user.get('slug')}/week/${start.toISOString().replace(/T.+/, '')}`}>
        {this.emoji}
      </a>
    )
  }

  get emoji() {
    return Emoji.get('baby')
  }
}

ReactMixin(Week.prototype, React.addons.PureRenderMixin);
