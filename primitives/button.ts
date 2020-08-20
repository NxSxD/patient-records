import styled from "styled-components";

export const Button = styled.button`
  height: 45px;
  min-width: 120px;
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

export const ButtonAnchor = styled.a`
  height: 45px;
  min-width: 120px;
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
  background-color: var(--primary-color);
  color: #fff;
`;

export const ButtonLink = styled(ButtonAnchor)`
  background-color: var(--primary-color);
  color: #fff;
`;
