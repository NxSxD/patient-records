
export interface Route {
  id: string;
  displayName: string;
  route: string;
}

export const ROUTES: Route[] = [
  {
    id: "my_appointments",
    displayName: "My Appointments",
    route: "/my-appointments",
  },
  {
    id: "my_medications",
    displayName: "My Medications",
    route: "/my-medications",
  },
];