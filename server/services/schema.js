const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = require('graphql');

const { getUsers, getUserById, addUser } = require('./users');
const {
  getUserConsumptionsByUserID,
  addUserConsumptions,
} = require('./userConsumptions');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    consumptions: {
      type: new GraphQLList(UserConsumptionsType),
      resolve: ({ id }) => getUserConsumptionsByUserID(id),
    },
  }),
});

const UserConsumptionsType = new GraphQLObjectType({
  name: 'UserConsumptions',
  fields: () => ({
    id: { type: GraphQLID },
    userid: { type: GraphQLInt },
    date: { type: GraphQLString },
    alcool_quantity: { type: GraphQLInt },
    water_quantity: { type: GraphQLInt },
    exercise_quantity: { type: GraphQLInt },
    calories_quantity: { type: GraphQLInt },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: () => getUsers(),
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve: (parents, { id }) => getUserById(id),
    },
    user_consumptions: {
      type: new GraphQLList(UserConsumptionsType),
      resolve: userId => getConsumptionByUserId(userId),
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (parent, { username, password }) =>
        await addUser(username, password),
    },
    addUserConsumptions: {
      type: UserConsumptionsType,
      args: {
        userid: { type: GraphQLInt },
        date: { type: GraphQLString },
        alcool_quantity: { type: GraphQLInt },
        water_quantity: { type: GraphQLInt },
        exercise_quantity: { type: GraphQLInt },
        calories_quantity: { type: GraphQLInt },
      },
      resolve: async (
        parent,
        {
          userid,
          date,
          alcool_quantity,
          water_quantity,
          exercise_quantity,
          calories_quantity,
        }
      ) => {
        return await addUserConsumptions(
          userid,
          date,
          alcool_quantity,
          water_quantity,
          exercise_quantity,
          calories_quantity
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: Mutation,
});
