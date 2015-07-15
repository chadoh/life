import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent'

export default class Home extends React.Component {
  render() {
    return (<h1>Hello {this.props.user ? this.props.user.name : ''}</h1>);
  }
}
