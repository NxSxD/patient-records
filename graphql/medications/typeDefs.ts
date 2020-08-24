import { gql } from "apollo-server-micro";

// Medications typeDefs
export const typeDefs = gql`
  input UpdateMedicationPayload {
    id: ID!
    name: String!
    dosage: String!
    frequency: String!
    cost: Float!
  }

  type Medication {
    id: ID!
    name: String!
    dosage: String!
    frequency: String!
    cost: Float!
  }
`;
