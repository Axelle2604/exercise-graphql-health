import { gql } from 'apollo-boost';

export const usersQuery = gql`
  {
    users {
      id
      username
      password
    }
  }
`;

export const userQuery = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      username
      password
      consumptions {
        id
        userid
        date
        alcool_quantity
        water_quantity
        exercise_quantity
        calories_quantity
      }
    }
  }
`;

// user($id: Int) {
//   getUserByID(id: $id){
//     id
//     username
//     password
//     consumptions {
//       id
//       userid
//       date
//       alcool_quantity
//       water_quantity
//       exercise_quantity
//       calories_quantity
//     }
//   }
// }

export const addUserMutation = gql`
  mutation($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      username
      password
    }
  }
`;
