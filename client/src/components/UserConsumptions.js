import React from 'react';
import { userConsumptionsQuery } from '../services/userConsumptions';
import { graphql } from 'react-apollo';

const UserConsumptions = ({ selectedUser: { username, id } }) => {
  return (
    <div>
      <h2>User Consumptions</h2>
      <div>
        <span>Selected user : {username}</span>
      </div>
    </div>
  );
};

export default graphql(userConsumptionsQuery, { name: 'getUserConsumptions' })(
  UserConsumptions
);
