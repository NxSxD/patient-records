import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import medicationsJson from "./medications.json";
import { UPDATE_MEDICATION } from "../queries";
import { MedicationListItem } from "../medication-list-item";

const initialMedication = medicationsJson[0];
const updatedMedication = {
  ...initialMedication,
  name: "Medication 1000",
  dosage: "1 Gallon",
  frequency: "1000/always",
  cost: 1000.0,
};

const mocks = [
  {
    request: {
      query: UPDATE_MEDICATION,
      variables: {
        medication: updatedMedication,
      },
    },
    result: {
      data: { updateMedication: updatedMedication },
    },
  },
];

describe("Medication List Item", () => {
  const onUpdate = jest.fn();

  beforeEach(() => {
    onUpdate.mockReset();
  });

  it("should render according to snapshot", () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MedicationListItem
          medication={initialMedication}
          onItemUpdate={onUpdate}
        />
      </MockedProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it("should invoke onUpdate", async () => {
    const { getByText, getByLabelText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MedicationListItem
          medication={initialMedication}
          onItemUpdate={onUpdate}
        />
      </MockedProvider>
    );

    fireEvent.click(getByText("Edit"));

    fireEvent.input(getByLabelText(/Name-input/), {
      target: { value: updatedMedication.name },
    });

    fireEvent.change(getByLabelText(/Dosage-input/), {
      target: { value: updatedMedication.dosage },
    });

    fireEvent.input(getByLabelText(/Frequency-input/), {
      target: { value: updatedMedication.frequency },
    });

    fireEvent.input(getByLabelText(/Cost-input/), {
      target: { value: updatedMedication.cost },
    });

    fireEvent.click(getByText("Save"));

    await waitFor(() => {
      expect(getByText("Save")).toBeInTheDocument();
    });

    expect(onUpdate).toHaveBeenCalled();
  });
});
