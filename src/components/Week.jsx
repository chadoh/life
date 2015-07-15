import React from 'react';
import ReactMixin from 'react-mixin';
import Emoji from 'node-emoji';
import UserStore from '../stores/UserStore';
import { Link } from 'react-router';

export default class Week extends React.Component {
  render() {
    let start = UserStore.dateOf(this.props.weekno);
    let klass = new Date() > start ? 'past' : '';
    return (
      <Link to="week" className={klass}
        data-tooltip={this.tooltip(start.toDateString())}
        params={{slug: UserStore.getState().user.get('slug'), weekno: this.props.weekno}}>
        {this.emoji}
      </Link>
    )
  }

  get emoji() {
    return this.props.events ? Emoji.get(this.props.events.first().get('emoji')) : "●"
  }

  tooltip(date) {
    return this.props.events ? `${date}: ${this.props.events.first().get('summary')}` : date
  }
}

ReactMixin(Week.prototype, React.addons.PureRenderMixin);
