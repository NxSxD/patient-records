import React, { useEffect } from "react";
import styled from "styled-components";
import {
  Mask,
  ModalCard,
  ModalHeader,
  ButtonPrimary,
  Form,
  Spinner,
} from "../primitives";
import { Formik, FormikHelpers } from "formik";
import { Field } from "../components";
import { Appointment } from "./types";
import dayjs from "dayjs";
import { geocodeAddress } from "./geocode-address";
import {
  ADD_APPOINTMENT,
  AddAppointmentData,
  AddAppointmentVariables,
} from "./queries";
import { useMutation } from "@apollo/react-hooks";

interface AddAppointmentModalProps extends React.RefAttributes<HTMLDivElement> {
  onAppointmentAdded: (data: Appointment) => void;
}

interface FormValues {
  doctor: string;
  date: string;
  time: string;
  location: string;
}

export const AddAppointmentModal = React.forwardRef<
  HTMLDivElement,
  AddAppointmentModalProps
>(function addAppointmentModal({ onAppointmentAdded }, ref) {
  const values: FormValues = {
    doctor: "",
    date: "",
    time: "",
    location: "",
  };

  const [addAppointment, { data, loading }] = useMutation<
    AddAppointmentData,
    AddAppointmentVariables
  >(ADD_APPOINTMENT);

  useEffect(() => {
    if (!data || !data.addAppointment) return;
    if (data.addAppointment.id) onAppointmentAdded(data.addAppointment);
  }, [data]);

  const onSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    if (!values.doctor) {
      helpers.setErrors({ doctor: "Doctor's name is required." });
      return;
    }

    if (!values.date) {
      helpers.setErrors({ date: "Appointment date is required." });
      return;
    }

    if (!values.time) {
      helpers.setErrors({ time: "Appointment time is required." });
      return;
    }

    if (!values.location) {
      helpers.setErrors({ location: "Appointment location is required." });
      return;
    }

    const appointmentLocation = await geocodeAddress(values.location);
    if (!appointmentLocation) {
      helpers.setErrors({ location: "Invalid address provided." });
      return;
    }

    const [hour, minute] = values.time.split(":");
    const appointment_time = dayjs(values.date)
      .hour(parseInt(hour))
      .minute(parseInt(minute))
      .toISOString();
    const appointment: Appointment = {
      doctor: values.doctor,
      appointment_time,
      location: appointmentLocation,
    };

    addAppointment({
      variables: {
        appointment,
      },
    });

    helpers.setSubmitting(false);
  };

  return (
    <PageMask>
      <ModalCard ref={ref}>
        <ModalHeader>New Appointment</ModalHeader>
        <FormContainer>
          <Formik initialValues={values} onSubmit={onSubmit}>
            {({ handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <Field label="Doctor" name="doctor" type="text" />
                <Field label="Date" name="date" type="date" />
                <Field label="Time" name="time" type="time" />
                <Field label="Location" name="location" type="text" />
                <ButtonPrimary type="submit" disabled={isSubmitting || loading}>
                  {isSubmitting ? (
                    <Spinner aria-label="Loading..." />
                  ) : (
                    "Add Appointment"
                  )}
                </ButtonPrimary>
              </Form>
            )}
          </Formik>
        </FormContainer>
      </ModalCard>
    </PageMask>
  );
});

const PageMask = styled(Mask)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: flex-end;

  @media screen and (min-width: 720px) {
    align-items: center;
  }
`;

const FormContainer = styled.div`
  flex: 1;
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
