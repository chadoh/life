import React from 'react';
import ReactMixin from 'react-mixin';
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
        {this.emoji()}
      </Link>
    )
  }

  emoji() {
    return this.props.events && this.props.events.first() ?
      this.props.events.first().get('emoji') :
      "●"
  }

  tooltip(date) {
    let append = '';
    if (this.props.events && this.props.events.first())
      append = `: ${this.props.events.first().get('summary')}`;
    return `Week of ${date}` + append;
  }
}

ReactMixin(Week.prototype, React.addons.PureRenderMixin);
