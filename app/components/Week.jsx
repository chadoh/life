import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactMixin from 'react-mixin';
import ReactEmoji from 'react-emoji';
import UserStore from '../stores/UserStore';
import { Link } from 'react-router';

export default class Week extends React.Component {
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

  linkTo() {
    if(this.props.weekno === this.props.selectedWeek)
      return `/${UserStore.getState().getIn(['user', 'slug'])}`;
    else
      return `/${UserStore.getState().getIn(['user', 'slug'])}/week/${this.props.weekno}`;
  }

  klass() {
    const currentWeek = UserStore.getState().getIn(['user', 'current_week'])
    let klass;

    if(currentWeek - 1 === this.props.weekno) klass = 'past previous';
    else if(currentWeek > this.props.weekno) klass = 'past';
    else if(currentWeek === this.props.weekno) klass = 'now';

    return klass
  }

  render() {
    const start = UserStore.startOf(this.props.weekno);
    return (
      <Link to={this.linkTo()} className={this.klass()}
        data-tooltip={this.tooltip(start.toDateString())}>
        {this.emoji()}
        {this.props.weekno === this.props.selectedWeek ? <div className="arrow"/> : null}
      </Link>
    )
  }
}

ReactMixin(Week.prototype, ReactEmoji);
ReactMixin(Week.prototype, PureRenderMixin);
