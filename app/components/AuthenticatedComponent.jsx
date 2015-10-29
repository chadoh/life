import React from 'react';
import LoginStore from '../stores/LoginStore';

export default (ComposedComponent) => {
  return class AuthenticatedComponent extends React.Component {

    static willTransitionTo(transition) {
      if (!LoginStore.isLoggedIn()) {
        transition.redirect('/signin', {}, {'nextPath' : transition.path});
      }
    }

    constructor() {
      super()
      this.state = this._getLoginState();
    }

    _getLoginState() {
      return {
        userLoggedIn: LoginStore.isLoggedIn(),
        user: LoginStore.getState().user,
        idToken: LoginStore.getState().idToken
      };
    }

    componentDidMount() {
      this.changeListener = this._onChange.bind(this);
      LoginStore.listen(this.changeListener);
    }

    _onChange() {
      this.setState(this._getLoginState());
    }

    componentWillUnmount() {
      LoginStore.unlisten(this.changeListener);
    }

    render() {
      return (
      <ComposedComponent
        {...this.props}
        user={this.state.user}
        idToken={this.state.idToken}
        userLoggedIn={this.state.userLoggedIn} />
      );
    }
  }
};
