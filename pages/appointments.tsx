import React, { useState, useRef } from "react";
import { NavigationBar } from "../components";
import { PageContainer } from "../primitives";
import { withApollo } from "../apollo";
import { useQuery } from "@apollo/react-hooks";
import {
  AppointmentList,
  GET_APPOINTMENTS,
  GetAppointmentsData,
  GetAppointmentsVariables,
  Appointment,
} from "../appointments";
import { AddAppointmentModal } from "../appointments/add-appointment-modal";
import { useOutsideClick } from "../hooks";
import { ProtectRoute } from "../routes";

interface MyAppointmentProps {}

const MyAppointments: React.FC<MyAppointmentProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data, refetch } = useQuery<
    GetAppointmentsData,
    GetAppointmentsVariables
  >(GET_APPOINTMENTS, {
    fetchPolicy: "cache-and-network",
  });

  const onOutsideClick: EventListener = (ev: MouseEvent) => {
    setShowModal(false);
  };

  useOutsideClick<HTMLDivElement>(ref, onOutsideClick);

  const onAddAppointmentClick = () => {
    setShowModal(true);
  };

  const onAppointmentAdded = (_: Appointment) => {
    refetch();
    setShowModal(false);
  };

  return (
    <>
      <NavigationBar />
      <PageContainer>
        <AppointmentList
          appointments={data?.appointments}
          onAddAppointment={onAddAppointmentClick}
        />
        {showModal && (
          <AddAppointmentModal
            ref={ref}
            onAppointmentAdded={onAppointmentAdded}
          />
        )}
      </PageContainer>
    </>
  );
};

export default ProtectRoute(withApollo({ ssr: true })(MyAppointments));
