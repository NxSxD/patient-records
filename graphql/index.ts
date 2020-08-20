import { appointmentResolvers, appointmentTypeDefs } from "./appointments";
import { userQueries, userMutations, userTypeDefs } from "./users";
import { gql, makeExecutableSchema } from "apollo-server-micro";

const resolvers = {
  Query: {
    ...appointmentResolvers,
    ...userQueries,
  },
  Mutation: {
    ...userMutations,
  }
};

const rootTypeDef = gql`
  type Query {
    appointments: [Appointment!]
    users: [User!]!
  }

  type Mutation {
    login(credentials: Credentials): AuthPayload
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [rootTypeDef, appointmentTypeDefs, userTypeDefs],
  resolvers,
});
