import styled from "styled-components";

export const Mask = styled.div`
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ModalCard = styled.div`
  background: #fff;
  border-radius: 4px;
  min-height: 450px;
  width: 80%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  font-size: 1.2rem;
  color: #999;
`;
