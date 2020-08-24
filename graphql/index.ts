import { userQueries, userMutations, userTypeDefs } from "./users";
import {
  appointmentQueries,
  appointmentMutations,
  appointmentTypeDefs,
} from "./appointments";
import {
  medicationTypeDefs,
  medicationQueries,
  medicationMutations,
} from "./medications";
import { gql, makeExecutableSchema } from "apollo-server-micro";

const resolvers = {
  Query: {
    ...userQueries,
    ...appointmentQueries,
    ...medicationQueries,
  },
  Mutation: {
    ...userMutations,
    ...appointmentMutations,
    ...medicationMutations,
  },
};

const rootTypeDef = gql`
  type Query {
    # Users
    users: [User!]!
    # Appointments
    appointments(limit: Int, orderBy: String): [Appointment!]
    appointment(id: ID!): Appointment
    # Medications
    medications: [Medication!]!
  }

  type Mutation {
    # Users
    login(credentials: Credentials): AuthPayload
    # Appointments
    addAppointment(appointment: NewAppointmentPayload): Appointment!
    # Medications
    updateMedication(medication: UpdateMedicationPayload): Medication!
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [
    rootTypeDef,
    appointmentTypeDefs,
    medicationTypeDefs,
    userTypeDefs,
  ],
  resolvers,
});

export { getUser } from "./users";
