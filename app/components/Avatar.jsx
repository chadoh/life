import React from 'react';
import { Link } from 'react-router';

export default class Avatar extends React.Component {
  render() {
    return <Link to="user" params={{slug: this.props.user.slug}}
      className="header-avatar"
      style={{backgroundImage: `url(${this.props.user.imageUrl})`}}>You</Link>
  }
}
