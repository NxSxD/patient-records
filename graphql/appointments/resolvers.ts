import { Appointment } from "./types";
import appointmentsJson from "./appointments.json";

const appointments: Appointment[] = appointmentsJson;

const getAppointments = () => {
  return appointments;
};

export const resolvers = {
  appointments: getAppointments,
};
