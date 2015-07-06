import React from 'react';
import UserStore from '../stores/UserStore';
import UserService from '../services/UserService';
import WholeLife from './WholeLife';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getUserState();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    if (!this.state.user.id) {
      UserService.getUser(this.props.params.slug)
    }

    UserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(this.getUserState());
  }

  getUserState() {
    return {
      user: UserStore.user
    };
  }

  render() {
    var cal = !this.state.user.born ? '' :
      <WholeLife user={this.state.user} />
    return (
      <div>
        <h1>{this.state.user.name} <small>A life</small></h1>
        {cal}
      </div>
    );
  }
}
