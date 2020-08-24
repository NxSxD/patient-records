import React from "react";
import { Medication } from "./types";
import { ListHeader, Empty, ListContainer } from "../primitives";
import { MedicationListItem } from "./medication-list-item";

interface MedicationListProps {
  medications: Medication[];
  onItemUpdate: (medication: Medication) => void;
}

export const MedicationsList: React.FC<MedicationListProps> = ({
  medications,
  onItemUpdate,
}) => {
  const onUpdate = (med: Medication) => {
    onItemUpdate(med);
  };

  return (
    <ListContainer>
      <ListHeader>My Medications</ListHeader>
      {medications?.length > 0 ? (
        medications.map((med) => (
          <MedicationListItem
            key={med.id}
            medication={med}
            onItemUpdate={onUpdate}
          />
        ))
      ) : (
        <Empty>Seems like you don&apos;t have any medications yet.</Empty>
      )}
    </ListContainer>
  );
};
