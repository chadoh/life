import React from 'react';
import { RouteHandler } from 'react-router';
import '../lib/googleAuth'

export default class AuthenticatedApp extends React.Component {
  render() {
    return (
      <RouteHandler/>
    );
  }
}
