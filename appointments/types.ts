export interface AppointmentLocation {
  lat: number;
  lng: number;
}

export interface Appointment {
  id?: string;
  doctor: string;
  appointment_time: string;
  location: AppointmentLocation;
}