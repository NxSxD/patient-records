import React from "react";
import styled from "styled-components";

interface MarkerProps {
  lat: number;
  lng: number;
}

export const Marker: React.FC<MarkerProps> = (_) => {
  return (
    <SVG
      viewBox="0 0 64 64"
      aria-labelledby="title"
      aria-describedby="desc"
      role="img"
      width="64"
      height="64"
    >
      <title>Pointer</title>
      <desc>A flat styled icon from Orion Icon Library.</desc>
      <path
        data-name="layer2"
        d="M32 63.036a1 1 0 0 1-1-1V23.964a1 1 0 1 1 2 0v38.072a1 1 0 0 1-1 1z"
        fill="#7b8baf"
      ></path>
      <circle
        data-name="layer1"
        cx="32"
        cy="12.964"
        r="11"
        fill="#f27e7c"
      ></circle>
      <path
        data-name="opacity"
        d="M32 1.964a11 11 0 0 0 0 22z"
        fill="#000064"
        opacity=".15"
      ></path>
    </SVG>
  );
};

const SVG = styled.svg`
  position: absolute;
  transform: translate(-50%, -100%);
`;
