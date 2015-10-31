import React from 'react';
import { Link } from 'react-router';

export default class User extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return null
  }
  componentDidMount() {
    this.portal = document.createElement('h1')
    this.portal.className = "brand"
    document.querySelector('.nav-buttons nav').appendChild(this.portal)
    this.renderTitleContent(this.props)
  }
  renderTitleContent(props) {
    React.render(
      <div>
        {props.children}
      </div>,
      this.portal
    )
  }
  componentWillReceiveProps(nextProps) {
    this.renderTitleContent(nextProps)
  }
  componentWillUnmount() {
    React.unmountComponentAtNode(this.portal)
  }
}
