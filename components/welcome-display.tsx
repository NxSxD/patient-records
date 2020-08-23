import React from "react";
import styled from "styled-components";
import { ROUTES } from "../routes";
import { ButtonLink, PageContainer } from "../primitives";
import Link from "next/link";

const myAppointments = ROUTES.find((r) => r.id == "appointments");
const myMedications = ROUTES.find((r) => r.id == "medications");

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
  justify-content: flex-end;
  align-items: center;
  font-size: 1.5rem;
  padding-bottom: 1rem;
`;

const OptionsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding-top: 1rem;
  & > span {
    margin: 0 2rem;
  }
`;

const OR = styled.span`
  content: "Or";
  font-size: 1.2rem;
  line-height: 45px;
  color: var(--primary-color);
`;
