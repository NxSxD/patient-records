import { gql } from "@apollo/react-hooks";
import { Appointment } from "./types";

// Get last 3 appointments
export interface GetAppointmentsVariables {}

export interface GetAppointmentsData {
  appointments: Appointment[]
}

export const GET_APPOINTMENTS = gql`
  query getAppointments {
    appointments(
      limit: 3,
      orderBy: "appointment_time"
    ) {
      id
      doctor
      appointment_time
      location {
        lat
        lng
      }
    }
  }
`;

// Get appointment by ID
export interface GetAppointmentVariables {}

export interface GetAppointmentData {
  appointment: Appointment;
}

export const GET_APPOINTMENT = gql`
  query getAppointment($id: ID!) {
    appointment(id: $id) {
      id
      doctor
      appointment_time
      location {
        lat
        lng
      }
    }
  }
`;

// Add Appointment
export interface AddAppointmentVariables {
  appointment: Omit<Appointment, 'id'>;
}

export interface AddAppointmentData {
  addAppointment: Appointment;
}

export const ADD_APPOINTMENT = gql`
  mutation addAppointment($appointment: NewAppointmentPayload) {
    addAppointment(appointment: $appointment) {
      id
      doctor
      appointment_time
      location {
        lat
        lng
      }
    }
  }
`;