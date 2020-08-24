import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppointmentList } from "../appointment-list";

import appointmentsJson from "./appointments.json";

describe("Appointment List", () => {
  const onAddAppointment = jest.fn();

  beforeEach(() => {
    onAddAppointment.mockReset();
  });

  it("should render according to snapshot", () => {
    const { container } = render(
      <AppointmentList
        appointments={appointmentsJson}
        onAddAppointment={onAddAppointment}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("should invoke onAddAppointment", () => {
    render(
      <AppointmentList
        appointments={appointmentsJson}
        onAddAppointment={onAddAppointment}
      />
    );

    fireEvent.click(screen.getByText(/\+ Appointment/));

    expect(onAddAppointment).toHaveBeenCalled();
  });
});
