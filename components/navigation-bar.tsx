import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { ROUTES } from "../routes";
import { WidthContainer } from "../primitives";

interface NavigationBarProps {
  title?: string;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ title }) => {
  return (
    <Nav>
      <NavPageContainer>
        <Link href="/welcome">
          <Title>{title ? title : "My Patient Records"}</Title>
        </Link>
        <LinksContainer>
          {ROUTES.map((link) => (
            <Link key={link.id} href={link.route}>
              <Anchor>{link.displayName}</Anchor>
            </Link>
          ))}
        </LinksContainer>
      </NavPageContainer>
    </Nav>
  );
};

const Nav = styled.nav`
  height: 65px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: stretch;
  padding-left: 12px;
  padding-right: 12px;
  /* border-bottom: 1px solid #DDD; */
  box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.2);
`;

const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled(CenteredContainer)`
  color: var(--text);
  &:hover {
    cursor: pointer;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Anchor = styled.a`
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 250ms;
  padding: 0 1rem;
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const NavPageContainer = styled(WidthContainer)`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (min-width: 1200px) {
    max-width: 1200px;
  }
`;
