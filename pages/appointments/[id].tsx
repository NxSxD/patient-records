import React from "react";
import styled from "styled-components";
import { withApollo } from "../../apollo";
import { NavigationBar } from "../../components";
import { PageContainer } from "../../primitives";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import {
  GetAppointmentData,
  GetAppointmentVariables,
  GET_APPOINTMENT,
  Marker,
  AppointmentMap,
} from "../../appointments";
import dayjs from "dayjs";
import useSWR from "swr";

const AppointmentDetail = () => {
  const router = useRouter();
  const appointmentID = router.query.id;

  const { data, loading } = useQuery<
    GetAppointmentData,
    GetAppointmentVariables
  >(GET_APPOINTMENT, {
    variables: {
      id: appointmentID,
    },
  });

  const center = {
    lat: data?.appointment?.location.lat || 0,
    lng: data?.appointment?.location.lng || 0,
  };

  return (
    <>
      <NavigationBar />
      <PageContainer>
        <DetailContainer>
          <Row>
            <InfoLabel>Doctor:</InfoLabel>
            <InfoValue>{data?.appointment?.doctor}</InfoValue>
          </Row>
          <Row>
            <InfoLabel>Appointment Date:</InfoLabel>
            <InfoValue>
              {dayjs(data?.appointment?.appointment_time).format(
                "MM/DD/YY - HH:MMa"
              )}
            </InfoValue>
          </Row>
          {!loading && data && (
            <AppointmentMap center={center} zoom={14}>
              <Marker lat={center.lat} lng={center.lng} />
            </AppointmentMap>
          )}
        </DetailContainer>
      </PageContainer>
    </>
  );
};

const DetailContainer = styled.div`
  padding: 3rem 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  min-height: 45px;
  margin-bottom: 1.5rem;
  /* display: flex; */
  /* flex-direction: row; */
`;

const InfoLabel = styled.span`
  font-size: 1.2rem;
  color: #aaa;
  margin-right: 1rem;
`;

const InfoValue = styled.span`
  font-size: 1.5rem;
  color: var(--text);
`;

export default withApollo({ ssr: true })(AppointmentDetail);
