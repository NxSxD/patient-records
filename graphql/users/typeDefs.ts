import { gql } from "apollo-server-micro";

// User typeDefs
export const typeDefs = gql`
  type User {
    username: String!
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String
  }

  input Credentials {
    email: String!
    password: String!
  }
`;
