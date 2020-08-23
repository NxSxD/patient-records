import { gql } from "@apollo/react-hooks";
import { Medication } from "./types";

// Get Medications
export interface GetMedicationsVariables {}

export interface GetMedicationsData {
  medications: Medication[];
}

export const GET_MEDICATIONS = gql`
  query getMedications {
    medications {
      id
      name
      dosage
      frequency
      cost
    }
  }
`;

// Update Medication
export interface UpdateMedicationVariables {
  medication: Medication;
}

export interface UpdateMedicationData {
  updateMedication: Medication;
}

export const UPDATE_MEDICATION = gql`
  mutation updateMed($medication: UpdateMedicationPayload) {
    updateMedication(medication: $medication) {
      id
      name
      dosage
      frequency
    }
  }
`;
