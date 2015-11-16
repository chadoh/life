import React from 'react';
import { Link } from 'react-router';

export default class Workit extends React.Component {
  render() {
    return (
      <div {...this.props}>
        <h1 className="brand">Take control of your life</h1>
        <p><small>for only $10 a year</small></p>
        <Link to={"/signin"} className="button">
          <h3>&rarr; Claim your FREE <nobr>life calendar now &larr;</nobr></h3>
        </Link>
      </div>
    )
  }
}
