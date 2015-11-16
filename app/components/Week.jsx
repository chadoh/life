import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactMixin from 'react-mixin';
import ReactEmoji from 'react-emoji';
import UserStore from '../stores/UserStore';
import { Link } from 'react-router';

export default class Week extends React.Component {
  render() {
    let start = UserStore.dateOf(this.props.weekno);
    let klass = new Date() > start ? 'past' : '';
    return (
      <Link to={`/${UserStore.getState().getIn(['user', 'slug'])}/week/${this.props.weekno}`}
        className={klass} data-tooltip={this.tooltip(start.toDateString())}>
        {this.emoji()}
      </Link>
    )
  }

  emoji() {
    return this.props.events && this.props.events.first() ?
      this.emojify(this.props.events.first().get('emoji'), {attributes: {className: 'emoji'}}) :
      "●"
  }

  tooltip(date) {
    let append = '';
    if (this.props.events && this.props.events.first())
      append = `: ${this.props.events.first().get('summary')}`;
    return `Week of ${date}` + append;
  }
}

ReactMixin(Week.prototype, ReactEmoji);
ReactMixin(Week.prototype, PureRenderMixin);
