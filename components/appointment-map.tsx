import React from "react";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";

interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

export const AppointmentMap: React.FC<MapProps> = ({
  center,
  children,
  zoom,
}) => {
  return (
    <MapContainer>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDWO-NcYK0BFVe4MfRZ1iDumC8Q535jANo" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {children}
      </GoogleMapReact>
    </MapContainer>
  );
};

const MapContainer = styled.div`
  height: 100%;
  width: 100%;

  @media screen and (min-width: 1200px) {
    max-width: 1200px;
  }
`;
