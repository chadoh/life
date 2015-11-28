import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactMixin from 'react-mixin';
import ReactEmoji from 'react-emoji';
import UserStore from '../stores/UserStore';
import { Link } from 'react-router';

export default class Week extends React.Component {
  render() {
    const start = UserStore.dateOf(this.props.weekno);
    const currentWeek = UserStore.getState().getIn(['user', 'current_week'])
    let klass;

    if(currentWeek - 1 === this.props.weekno) klass = 'past last-week';
    else if(currentWeek > this.props.weekno) klass = 'past';
    else if(currentWeek === this.props.weekno) klass = 'now';

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
      append = `: ${this.props.events.first().get('title')}`;
    return `Week of ${date}` + append;
  }
}

ReactMixin(Week.prototype, ReactEmoji);
ReactMixin(Week.prototype, PureRenderMixin);
