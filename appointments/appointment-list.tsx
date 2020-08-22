import React, { useCallback } from "react";
import styled from "styled-components";
import { Appointment } from "./types";
import dayjs from "dayjs";
import { ButtonPrimary } from "../primitives";
import { useRouter } from "next/router";
import Link from "next/link";

interface AppointmentListProps {
  appointments: Appointment[];
  onAddAppointment?: () => void;
}

export const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  onAddAppointment,
}) => {
  const router = useRouter();

  const onAdd = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    onAddAppointment && onAddAppointment();
  };

  const onAppointmentClick = useCallback(
    (id: string) => {
      if (!id) return;
      router.push(`/appointments/${id}`);
    },
    [router]
  );

  return (
    <Container>
      <ListHeader>
        <span>Last 3 appointments</span>
        <ButtonPrimary onClick={onAdd}>+ Appointment</ButtonPrimary>
      </ListHeader>
      {appointments?.length > 0 ? (
        appointments.map((ap) => (
          <Link key={ap.id} href={`/appointments/${ap.id}`}>
            <AppointmentDisplay>
              <span>{ap.doctor}</span>
              <span>
                {dayjs(ap.appointment_time).format("MM/DD/YY - HH:MMa")}
              </span>
            </AppointmentDisplay>
          </Link>
        ))
      ) : (
        <Empty>Seems like you don't have any appointments yet.</Empty>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding-top: 1rem;
  flex: 1;
`;

const ListHeader = styled.div`
  height: 65px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AppointmentDisplay = styled.div`
  height: 65px;
  border-radius: 4px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 0 1rem;
  margin-bottom: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const Empty = styled.span`
  color: var(--text);
`;
