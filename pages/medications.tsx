import React from "react";
import styled from "styled-components";
import { NavigationBar } from "../components";
import { PageContainer, Label } from "../primitives";
import { withApollo } from "../apollo";
import { useQuery } from "@apollo/react-hooks";
import {
  GetMedicationsData,
  GetMedicationsVariables,
  GET_MEDICATIONS,
  MedicationsList,
  Medication,
} from "../medications";
import dynamic from "next/dynamic";

// components/MyChart.js contains the recharts chart
const MedicationCostChart = dynamic(
  () => import("../medications/medication-cost-chart"),
  { ssr: false }
);

interface MyAppointmentProps {}

const MyAppointments: React.FC<MyAppointmentProps> = (_) => {
  const { data, refetch } = useQuery<
    GetMedicationsData,
    GetMedicationsVariables
  >(GET_MEDICATIONS, {
    fetchPolicy: "cache-and-network",
  });

  const onItemUpdate = (med: Medication) => {
    refetch();
  };

  const medicationCosts =
    data?.medications.map((med) => ({
      id: med.id,
      name: med.name,
      cost: med.cost,
    })) || [];

  return (
    <>
      <NavigationBar />
      <PageContainer>
        {data?.medications?.length && (
          <>
            <AnalysisRow>
              <Label>Daily Medications Cost</Label>
              <MedicationCostChart data={medicationCosts} />
            </AnalysisRow>
            <MedicationsList
              medications={data.medications}
              onItemUpdate={onItemUpdate}
            />
          </>
        )}
      </PageContainer>
    </>
  );
};

const AnalysisRow = styled.div`
  padding: 2rem 0;
`;

export default withApollo({ ssr: true })(MyAppointments);
