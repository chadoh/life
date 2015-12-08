import React from 'react';
import { Link } from 'react-router';
import placeholder from '../images/sunset-cliffs-tiny.jpeg';

class Avatar extends React.Component {
  render() {
    return <span className="header-avatar"
      style={{backgroundImage: `url(${this.props.user.imageUrl}), url(${placeholder})`}}>
      You
    </span>
  }
}

Avatar.propTypes = {
  user: React.PropTypes.shape({
    imageUrl: React.PropTypes.string,
  }).isRequired,
}

export default Avatar;
