import { Appointment } from "./types";
import appointmentsJson from "./appointments.json";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

const appointments: Appointment[] = appointmentsJson;

const getAppointments = (
  parent: null,
  args: { limit?: number; orderBy?: string } = {},
  context,
  info
): Appointment[] => {
  let data = appointments;

  if (args.orderBy && args.orderBy === "appointment_time") {
    data = appointments.sort((a, b) => {
      const aDate = dayjs(a.appointment_time);
      const bDate = dayjs(b.appointment_time);
      return aDate.isBefore(bDate) ? 1 : -1;
    });
  } else if (args.orderBy) {
    data = appointments.sort((a, b) =>
      a[args.orderBy] < b[args.orderBy] ? 1 : -1
    );
  }

  if (typeof args.limit === "number") {
    data = data.slice(0, args.limit);
  }

  return data;
};

const getAppointment = (parent: null, args: { id: string }, context, info) => {
  return appointments.find((ap) => ap.id == args.id);
};

async function addAppointment(
  parent: null,
  args: { appointment: Appointment },
  context,
  info
): Promise<Appointment> {
  const { appointment: payload } = args;

  const uuid = uuidv4();
  const newAppointment = {
    id: uuid,
    ...payload,
  };

  appointments.push(newAppointment);

  return newAppointment;
}

export const queries = {
  appointments: getAppointments,
  appointment: getAppointment,
};

export const mutations = {
  addAppointment,
};
