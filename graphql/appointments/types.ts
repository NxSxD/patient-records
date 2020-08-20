export interface AppointmentLocation {
  lat: number;
  lng: number;
}

export interface Appointment {
  appointment_time: string;
  doctor: string;
  location: AppointmentLocation;
}
