import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactMixin from 'react-mixin';
import ReactEmoji from 'react-emoji';
import UserStore from '../stores/UserStore';
import { Link } from 'react-router';

export default class Month extends React.Component {
  emoji() {
    return this.props.events && this.props.events.first() ?
      this.emojify(this.props.events.first().get('emoji'), {attributes: {className: 'emoji'}}) :
      "●"
  }

  tooltip(date) {
    let append = '';
    if (this.props.events && this.props.events.first())
      append = `: ${this.props.events.first().get('title')}`;
    return `Month of ${date}` + append;
  }

  render() {
    const start = UserStore.dateOf(this.props.monthno * 4);
    const currentMonth = Math.floor(UserStore.getState().getIn(['user', 'current_week']) / 4);
    let klass;

    if(currentMonth - 1 === this.props.monthno) klass = 'past previous';
    else if(currentMonth > this.props.monthno) klass = 'past';
    else if(currentMonth === this.props.monthno) klass = 'now';

    return (
      <Link to={`/${UserStore.getState().getIn(['user', 'slug'])}/month/${this.props.monthno}`}
        className={klass} data-tooltip={this.tooltip(start.toDateString())}>
        {this.emoji()}
      </Link>
    )
  }
}

ReactMixin(Month.prototype, ReactEmoji);
ReactMixin(Month.prototype, PureRenderMixin);
