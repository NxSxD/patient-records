export * from "./protected-route";

export interface Route {
  id: string;
  displayName: string;
  route: string;
}

export const ROUTES: Route[] = [
  {
    id: "appointments",
    displayName: "My Appointments",
    route: "/appointments",
  },
  {
    id: "medications",
    displayName: "My Medications",
    route: "/medications",
  },
];
