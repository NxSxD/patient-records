import { gql } from "apollo-server-micro";

// Patent Records typeDefs
export const typeDefs = gql`
  # AppointmentLocation defines geolcation
  # data for a patient's appointment
  type AppointmentLocation {
    lat: Float
    lng: Float
  }

  # AppointmentDateTime is an ISO date
  # string of a patient's appointment
  scalar AppointmentDateTime

  # Patient appointment
  type Appointment {
    appointment_time: AppointmentDateTime!
    doctor: String!
    location: AppointmentLocation!
  }
`;