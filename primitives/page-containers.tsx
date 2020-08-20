import styled from "styled-components";

export const WidthContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  @media screen and (min-width: 1200px) {
    max-width: 1200px;
  }
`;

const Container = styled.div`
  height: calc(100vh - 65px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PageContainer: React.FC<{}> = ({ children }) => (
  <Container>
    <WidthContainer>{children}</WidthContainer>
  </Container>
);
