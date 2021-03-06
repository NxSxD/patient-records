export interface AppointmentLocation {
  lat: number;
  lng: number;
}

export interface Appointment {
  id: string;
  appointment_time: string;
  doctor: string;
  location: AppointmentLocation;
}
