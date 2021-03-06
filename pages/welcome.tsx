import React from "react";
import { NavigationBar, WelcomeDisplay } from "../components";
import { PageContainer } from "../primitives";
import { ProtectRoute } from "../routes";

interface WelcomeProps {}

function WelcomePage(props: WelcomeProps) {
  return (
    <>
      <NavigationBar />
      <PageContainer>
        <WelcomeDisplay />
      </PageContainer>
    </>
  );
}

export default ProtectRoute(WelcomePage);
