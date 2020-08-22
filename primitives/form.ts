import styled from "styled-components";

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  margin-bottom: 2rem;
`;

export const Label = styled.span`
  color: #999;
  font-size: 1.1rem;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  font-size: 1.2rem;
  color: #666;
  padding-left: 12px;
  height: 45px;
`;

export const FieldError = styled.div`
  color: #ff0000;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
