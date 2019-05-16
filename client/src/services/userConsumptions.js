import { gql } from 'apollo-boost';

export const userConsumptionsQuery = gql`
  {
    user_consumptions {
      id
      userid
      date
      alcool_quantity
      water_quantity
      exercise_quantity
      calories_quantity
    }
  }
`;
