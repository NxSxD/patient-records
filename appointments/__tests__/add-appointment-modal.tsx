import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AddAppointmentModal } from "../add-appointment-modal";
import { ADD_APPOINTMENT } from "../queries";
import { Appointment } from "../types";
// @ts-ignore
import { MockedProvider } from "@apollo/client/testing";
import { geocodeAddress } from "../geocode-address";

jest.mock("../geocode-address", () => ({
  geocodeAddress: jest.fn().mockResolvedValue({ lat: 25, lng: 25 }),
}));

const date = "2020-08-28";
const time = "13:30";
const address = "459 Brandon Blvd, Brandon, Fl";
const submitButtonText = "Add Appointment";
const newAppointment: Appointment = {
  id: "123",
  doctor: "Doctor 1",
  appointment_time: "2020-08-28T17:30:00.000Z",
  location: {
    lat: 25,
    lng: 25,
  },
};

const mocks = [
  {
    request: {
      query: ADD_APPOINTMENT,
      variables: {
        appointment: {
          doctor: newAppointment.doctor,
          appointment_time: newAppointment.appointment_time,
          location: newAppointment.location,
        },
      },
    },
    result: {
      data: { addAppointment: newAppointment },
    },
  },
];

describe("AddAppointmentModal", () => {
  const onAppointmentAdded = jest.fn();

  beforeEach(() => {
    onAppointmentAdded.mockReset();
  });

  it("should render according to snapshot", () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddAppointmentModal onAppointmentAdded={onAppointmentAdded} />
      </MockedProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it("should invoke onAddAppointment", async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddAppointmentModal onAppointmentAdded={onAppointmentAdded} />
      </MockedProvider>
    );

    fireEvent.input(screen.getByLabelText(/Doctor-input/), {
      target: { value: newAppointment.doctor },
    });

    fireEvent.change(screen.getByLabelText(/Date-input/), {
      target: { value: date },
    });

    fireEvent.input(screen.getByLabelText(/Time-input/), {
      target: { value: time },
    });

    fireEvent.input(screen.getByLabelText(/Location-input/), {
      target: { value: address },
    });

    fireEvent.click(screen.getByText(submitButtonText));

    await waitFor(() => {
      expect(getByText(submitButtonText)).toBeInTheDocument();
    });

    expect(onAppointmentAdded).toHaveBeenCalled();
  });

  describe("Validate required fields", () => {
    test.each([
      [
        "Doctor's name is required.",
        [/Date-input/, /Time-input/, /Location-input/],
        [date, time, address],
      ],
      [
        "Appointment date is required.",
        [/Doctor-input/, /Time-input/, /Location-input/],
        [newAppointment.doctor, time, address],
      ],
      [
        "Appointment time is required.",
        [/Doctor-input/, /Date-input/, /Location-input/],
        [newAppointment.doctor, date, address],
      ],
      [
        "Appointment location is required.",
        [/Doctor-input/, /Date-input/, /Time-input/],
        [newAppointment.doctor, date, time],
      ],
    ])("should display error - %s", async (expected, inputs, values) => {
      const { getByText } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <AddAppointmentModal onAppointmentAdded={onAppointmentAdded} />
        </MockedProvider>
      );

      for (let i = 0; i < inputs.length; i++) {
        fireEvent.change(screen.getByLabelText(inputs[i]), {
          target: { value: values[i] },
        });
      }

      fireEvent.click(screen.getByText(submitButtonText));

      await waitFor(() => {
        expect(getByText(submitButtonText)).toBeInTheDocument();
      });

      expect(onAppointmentAdded).not.toHaveBeenCalled();
      expect(screen.getByRole("alert")).toHaveTextContent(expected);
    });

    describe("Inavlid gecode", () => {
      beforeEach(() => {
        // @ts-ignore
        geocodeAddress.mockReset().mockResolvedValue(null);
      });
      it("should display error: Invalid address provided.", async () => {
        const { getByText, getByLabelText } = render(
          <MockedProvider mocks={mocks} addTypename={false}>
            <AddAppointmentModal onAppointmentAdded={onAppointmentAdded} />
          </MockedProvider>
        );

        fireEvent.input(getByLabelText(/Doctor-input/), {
          target: { value: newAppointment.doctor },
        });

        fireEvent.change(getByLabelText(/Date-input/), {
          target: { value: date },
        });

        fireEvent.input(getByLabelText(/Time-input/), {
          target: { value: time },
        });

        fireEvent.input(getByLabelText(/Location-input/), {
          target: { value: "some random value" },
        });

        fireEvent.click(getByText(submitButtonText));

        await waitFor(() => {
          expect(getByText(submitButtonText)).toBeInTheDocument();
        });

        expect(onAppointmentAdded).not.toHaveBeenCalled();
        expect(screen.getByRole("alert")).toHaveTextContent(
          "Invalid address provided."
        );
      });
    });
  });
});
