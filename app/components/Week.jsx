import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactMixin from 'react-mixin';
import ReactEmoji from 'react-emoji';
import Immutable from 'immutable'
import UserStore from '../stores/UserStore';
import { Link } from 'react-router';

class Week extends React.Component {
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
    if(this.props.selected)
      return `/${UserStore.getState().getIn(['user', 'slug'])}`;
    else
      return `/${UserStore.getState().getIn(['user', 'slug'])}/week/${this.props.weekno}`;
  }

  klass() {
    const currentWeek = UserStore.getState().getIn(['user', 'current_week'])
    let klass;

    if(currentWeek - 1 === this.props.weekno) klass = 'past previous';
    else if(currentWeek + 1 === this.props.weekno) klass = 'next';
    else if(currentWeek > this.props.weekno) klass = 'past';
    else if(currentWeek === this.props.weekno) klass = 'now';

    return klass
  }

  render() {
    const start = UserStore.startOf(this.props.weekno);
    return (
      <Link to={this.linkTo()} className={this.klass()}
        title={this.tooltip(start.toDateString())}>
        {this.emoji()}
        {this.props.selected ? <div className="arrow"/> : null}
      </Link>
    )
  }
}

Week.propTypes = {
  events: (props, propName, componentName) => {
    if(props.events && !Immutable.List.isList(props.events))
      return new Error(`${componentName} component expected '${propName}' prop to be an Immutable.List!`)
  },
  weekno: React.PropTypes.number.isRequired,
  selected: React.PropTypes.bool.isRequired,
}

ReactMixin(Week.prototype, ReactEmoji);
ReactMixin(Week.prototype, PureRenderMixin);

export default Week
