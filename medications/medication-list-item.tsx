import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Medication } from "./types";
import {
  ItemInfo,
  InfoLabel,
  ListItemContainer,
  ItemActions,
  ButtonPrimary,
} from "../primitives";
import { SimpleField } from "../components";
import { FormikHelpers, Formik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import {
  UpdateMedicationData,
  UPDATE_MEDICATION,
  UpdateMedicationVariables,
} from "./queries";

interface MedicationListItemProps {
  medication: Medication;
  onItemUpdate: (med: Medication) => void;
}

interface EditValues
  extends Pick<Medication, "name" | "dosage" | "frequency" | "cost"> {}

export const MedicationListItem: React.FC<MedicationListItemProps> = ({
  medication,
  onItemUpdate,
}) => {
  const [updateMedication, { data }] = useMutation<
    UpdateMedicationData,
    UpdateMedicationVariables
  >(UPDATE_MEDICATION);
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const values = {
    name: medication.name,
    dosage: medication.dosage,
    frequency: medication.frequency,
    cost: medication.cost,
  };

  useEffect(() => {
    if (!data) return;

    if (data.updateMedication && data.updateMedication.id) {
      onItemUpdate(data.updateMedication);
    }
  }, [data]);

  const onSubmit = (values: EditValues, helpers: FormikHelpers<EditValues>) => {
    const updatedMed = {
      ...values,
      id: medication.id,
    };

    updateMedication({
      variables: {
        medication: updatedMed,
      },
    });

    setIsEditting(false);
  };

  const editMedication = (_: React.MouseEvent<HTMLButtonElement>) => {
    setIsEditting(true);
  };

  return !isEditting ? (
    <MedicationListContainer>
      <ItemInfo>
        <InfoLabel>Medication</InfoLabel>
        <span>{medication.name}</span>
      </ItemInfo>
      <ItemInfo>
        <InfoLabel>Dosage</InfoLabel>
        <span>{medication.dosage}</span>
      </ItemInfo>
      <ItemInfo>
        <InfoLabel>Frequency</InfoLabel>
        <span>{medication.frequency}</span>
      </ItemInfo>
      <ItemInfo>
        <InfoLabel>Cost</InfoLabel>
        <span>{`$${medication.cost}`}</span>
      </ItemInfo>
      <ItemActions>
        <EditButton onClick={editMedication}>Edit</EditButton>
      </ItemActions>
    </MedicationListContainer>
  ) : (
    <Formik initialValues={values} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <MedicationListContainer isEditting={isEditting}>
            <ItemInfo>
              <InfoLabel>Medication</InfoLabel>
              <SimpleField name="name" type="text" />
            </ItemInfo>
            <ItemInfo>
              <InfoLabel>Dosage</InfoLabel>
              <SimpleField name="dosage" type="text" />
            </ItemInfo>
            <ItemInfo>
              <InfoLabel>Frequency</InfoLabel>
              <SimpleField name="frequency" type="text" />
            </ItemInfo>
            <ItemInfo>
              <InfoLabel>Cost</InfoLabel>
              <SimpleField name="cost" type="number" />
            </ItemInfo>
            <ItemActions>
              <EditButton type="submit">Save</EditButton>
            </ItemActions>
          </MedicationListContainer>
        </form>
      )}
    </Formik>
  );
};

const MedicationListContainer = styled(ListItemContainer)<{
  isEditting?: boolean;
}>`
  ${(props) => {
    return (
      props.isEditting &&
      css`
        ${ItemInfo}::not(::last-of-type) {
          padding-right: 1rem;
        }
      `
    );
  }}
`;

const EditButton = styled(ButtonPrimary)`
  min-width: 85px;
  width: 85px;
`;
