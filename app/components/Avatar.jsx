import React from 'react';
import { Link } from 'react-router';

export default class Avatar extends React.Component {
  render() {
    return <span className="header-avatar"
      style={{backgroundImage: `url(${this.props.user.imageUrl})`}}>
      You
    </span>
  }
}
