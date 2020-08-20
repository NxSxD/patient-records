import React from "react";
import styled from "styled-components";
import { ROUTES } from "../routes";
import { ButtonLink, PageContainer } from "../primitives";
import Link from "next/link";

const myAppointments = ROUTES.find((r) => r.id == "my_appointments");
const myMedications = ROUTES.find((r) => r.id == "my_medications");

export const WelcomeDisplay = () => {
  return (
    <WelcomeContainer>
      <MessageContainer>
        Welcome! Select one of the options below to see your records.
      </MessageContainer>
      <OptionsContainer>
        <Link href={myAppointments.route}>
          <ButtonLink>{myAppointments.displayName}</ButtonLink>
        </Link>
        <OR>Or</OR>
        <Link href={myMedications.route}>
          <ButtonLink>{myMedications.displayName}</ButtonLink>
        </Link>
      </OptionsContainer>
    </WelcomeContainer>
  );
};

const WelcomeContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-around;
`;

const MessageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const OptionsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & > span {
    margin: 0 2rem;
  }
`;

const OR = styled.span`
  content: "Or";
  font-size: 1.2rem;
  color: var(--primary-color);
`;
