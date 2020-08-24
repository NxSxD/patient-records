import { gql } from "apollo-server-micro";

// Appointments typeDefs
export const typeDefs = gql`
  # AppointmentLocation defines geolcation
  # data for a patient's appointment
  type AppointmentLocation {
    lat: Float!
    lng: Float!
  }

  # AppointmentDateTime is an ISO date
  # string of a patient's appointment
  scalar AppointmentDateTime

  input AppointmentLocationInput {
    lat: Float!
    lng: Float!
  }

  # NewAppointmentPayload defines the fields passed in to create an appointment
  input NewAppointmentPayload {
    appointment_time: String!
    doctor: String!
    location: AppointmentLocationInput!
  }

  # Patient appointment
  type Appointment {
    id: ID!
    appointment_time: AppointmentDateTime!
    doctor: String!
    location: AppointmentLocation!
  }
`;
