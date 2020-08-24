import React from "react";
import styled from "styled-components";
import { Appointment } from "./types";
import dayjs from "dayjs";
import {
  ButtonPrimary,
  ListHeader,
  ListItemContainer,
  ListContainer,
  Empty,
  InfoLabel,
  ItemInfo,
} from "../primitives";
import Link from "next/link";

interface AppointmentListProps {
  appointments: Appointment[];
  onAddAppointment?: () => void;
}

export const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  onAddAppointment,
}) => {
  const onAdd = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    onAddAppointment && onAddAppointment();
  };

  return (
    <ListContainer>
      <ListHeader>
        <span>Last 3 appointments</span>
        <ButtonPrimary onClick={onAdd}>&#43; Appointment</ButtonPrimary>
      </ListHeader>
      {appointments?.length > 0 ? (
        appointments.map((ap) => (
          <Link key={ap.id} href={`/appointments/${ap.id}`}>
            <AppointmentDisplay>
              <ItemInfo>
                <InfoLabel>Doctor</InfoLabel>
                <span>{ap.doctor}</span>
              </ItemInfo>
              <ItemInfo>
                <InfoLabel>Appointment Time</InfoLabel>
                <span>
                  {dayjs(ap.appointment_time).format("MM/DD/YY -- HH:MMa")}
                </span>
              </ItemInfo>
            </AppointmentDisplay>
          </Link>
        ))
      ) : (
        <Empty>Seems like you don&apos;t have any appointments yet.</Empty>
      )}
    </ListContainer>
  );
};

const AppointmentDisplay = styled(ListItemContainer)`
  justify-content: space-between;
  align-items: center;
`;
