import React, { Component } from 'react';
import { userQuery, usersQuery, addUserMutation } from '../services/users';
import { graphql, compose, withApollo } from 'react-apollo';
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
  Legend,
} from 'recharts';

class Users extends Component {
  state = {
    username: '',
    password: '',
    selectedUser: { username: '', id: null },
    userConsumptions: [],
    graphFilterName: 'alcool_quantity',
  };

  onClickUserButton = async (id, username) => {
    this.setState({ username, id });
    const {
      data: { user },
    } = await this.props.client.query({
      query: userQuery,
      variables: {
        id,
      },
    });
    this.setState({ userConsumptions: user });
  };

  onClickAddUser = e => {
    e.preventDefault();
    const { addUser } = this.props;
    addUser({
      variables: this.state,
      refetchQueries: [{ query: usersQuery }],
    });
  };

  onChangeInput = (inputName, { target: { value } }) => {
    this.setState({ [inputName]: value });
  };

  onChangeGraphFilter = ({ target: { value } }) => {
    this.setState({ graphFilterName: value });
  };

  render() {
    const {
      getUsers: { users },
    } = this.props;
    const { userConsumptions } = this.state;
    const usersButtons =
      users &&
      users.map(({ id, username }) => (
        <button
          key={id}
          onClick={this.onClickUserButton.bind(this, id, username)}
        >
          {username}
        </button>
      ));
    const userForm = (
      <form>
        <input
          type="text"
          placeholder="UserName"
          onChange={this.onChangeInput.bind(this, 'username')}
        />
        <input
          type="text"
          placeholder="Password"
          onChange={this.onChangeInput.bind(this, 'password')}
        />
        <button onClick={this.onClickAddUser}>Add User</button>
      </form>
    );

    return (
      <div>
        <h2>Users</h2>
        <div>{userForm}</div>
        <div>{usersButtons}</div>
        <div>{userConsumptions && userConsumptions.username}</div>
        {console.log(userConsumptions)}
        {userConsumptions.consumptions && (
          <select onChange={this.onChangeGraphFilter}>
            <option value="alcool_quantity">Alcool</option>
            <option value="water_quantity">Water</option>
            <option value="exercise_quantity">Exercises</option>
            <option value="calories_quantity">Calories</option>
          </select>
        )}
        {userConsumptions.consumptions &&
          console.log(
            userConsumptions.consumptions[this.state.graphFilterName]
          )}
        {userConsumptions.consumptions && (
          <div>
            <LineChart
              width={500}
              height={300}
              data={userConsumptions.consumptions}
            >
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Legend />
              <Line
                type="monotone"
                dataKey={this.state.graphFilterName}
                stroke="#8884d8"
              />
            </LineChart>
          </div>
        )}
      </div>
    );
  }
}

export default compose(
  withApollo,
  graphql(usersQuery, { name: 'getUsers' }),
  graphql(addUserMutation, { name: 'addUser' })
)(Users);
