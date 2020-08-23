import styled from "styled-components";

export const Button = styled.button`
  height: 45px;
  padding: 0 1rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  transition: background-color 250ms;
  &:hover {
    cursor: pointer;
    background-color: var(--primary-alt-color);
  }

  &:focus {
    outline: none;
  }
`;

export const ButtonAnchor = styled.a`
  height: 45px;
  padding: 0 1rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  transition: background-color 250ms;
  &:hover {
    cursor: pointer;
    background-color: var(--primary-alt-color);
  }
`;

export const ButtonPrimary = styled(Button)`
  min-width: 120px;
  background-color: var(--primary-color);
  color: #fff;
`;

export const ButtonLink = styled(ButtonAnchor)`
  min-width: 120px;
  background-color: var(--primary-color);
  color: #fff;
`;
