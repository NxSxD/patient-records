import React from "react";
import { AppProps } from "next/app";
import "../styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";
import { AuthProvider } from "../users/auth-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />;
    </AuthProvider>
  );
}

export default MyApp;
