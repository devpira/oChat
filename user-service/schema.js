const { gql } = require('apollo-server');

const typeDefs = gql`

  type User {
    _id: String
    email: String
    displayName: String
    password: String
  }

  type Query {
      user: User
  }

  type Mutation {
    createUser(email: String!, displayName: String!, password: String!): User
  } 
`;

module.exports = {
  typeDefs
}
