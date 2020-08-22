import React from "react";
import styled from "styled-components";
import styles from "../styles/Loading.module.css";

export const Loading = () => (
  <div className={styles.roller}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export const Spinner = styled.div`
  border: 4px solid transparent; /* Light grey */
  border-top: 4px solid #fff; /* Blue */
  border-radius: 50%;
  width: 35px;
  height: 35px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
