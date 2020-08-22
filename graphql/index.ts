import {
  appointmentQueries,
  appointmentMutations,
  appointmentTypeDefs,
} from "./appointments";
import { userQueries, userMutations, userTypeDefs } from "./users";
import { gql, makeExecutableSchema } from "apollo-server-micro";

const resolvers = {
  Query: {
    ...appointmentQueries,
    ...userQueries,
  },
  Mutation: {
    ...userMutations,
    ...appointmentMutations,
  },
};

const rootTypeDef = gql`
  type Query {
    appointments(
      limit: Int
      orderBy: String
    ): [Appointment!]
    appointment(id: ID!): Appointment
    users: [User!]!
  }

  type Mutation {
    login(credentials: Credentials): AuthPayload
    addAppointment(appointment: NewAppointmentPayload): Appointment
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [rootTypeDef, appointmentTypeDefs, userTypeDefs],
  resolvers,
});
