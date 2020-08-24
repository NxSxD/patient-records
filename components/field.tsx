import React from "react";
import styled from "styled-components";
import { useField } from "formik";
import { FieldContainer, Label, Input, FieldError } from "../primitives";

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Field: React.FC<FieldProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);
  return (
    <FieldContainer>
      <Label>{label}</Label>
      <Input
        {...field}
        {...props}
        value={field.value}
        onChange={field.onChange}
        aria-label={`${label}-input`}
      />
      {meta.touched && meta.error ? (
        <FieldError role="alert">{meta.error}</FieldError>
      ) : null}
    </FieldContainer>
  );
};

export const SimpleField: React.FC<FieldProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);
  return (
    <Input
      {...field}
      {...props}
      value={field.value}
      onChange={field.onChange}
      aria-label={`${label}-input`}
    />
  );
};
