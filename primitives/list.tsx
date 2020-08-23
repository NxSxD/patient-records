import styled from "styled-components";

export const ListContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ListHeader = styled.div`
  height: 65px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ListItemContainer = styled.div`
  height: 65px;
  border-radius: 4px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  padding: 0 1rem;
  margin-bottom: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

export const Empty = styled.span`
  color: var(--text);
`;

export const InfoLabel = styled.span`
  font-size: 0.9rem;
  color: var(--text-label-color);
`;

export const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
`;

export const ItemActions = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-end;
`;

