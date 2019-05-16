import React, { Component } from 'react';
import Users from './Users';
import UserConsumptions from './UserConsumptions';

export default class AppContainer extends Component {
  state = {
    selectedUser: { username: '', id: null },
  };

  selectUser = (id, username) => {
    this.setState({ selectedUser: { username, id } });
  };

  render() {
    const { selectedUser } = this.state;
    return (
      <div>
        <h1>Health App</h1>
        <Users selectUser={this.selectUser} />
        <UserConsumptions selectedUser={selectedUser} />
      </div>
    );
  }
}
