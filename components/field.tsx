import React from "react";
import styled from "styled-components";
import { useField } from "formik";

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Field: React.FC<FieldProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);

  return (
    <FieldContainer>
      <Label>{label}</Label>
      <Input {...field} {...props} />
      {meta.touched && meta.error ? (
        <Error>{meta.error}</Error>
      ) : null}
    </FieldContainer>
  );
};

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  margin-bottom: 2rem;
`;

const Label = styled.span`
  color: #999;
  font-size: 1.1rem;
  margin-bottom: 5px;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  font-size: 1.2rem;
  color: #666;
  padding-left: 12px;
  height: 45px;
`;

const Error = styled.div`
  color: #ff0000;
`;