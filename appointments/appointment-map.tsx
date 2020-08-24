import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import { getAPIKey } from "./key";
import { Spinner } from "../primitives";

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
  const [mapsAPIKey, setMapsAPIKey] = useState<string>("");

  useEffect(() => {
    const getKey = async () => {
      try {
        const keyResponse = await getAPIKey();
        if(keyResponse.headers.get("Content-Type").includes("application/json")) {
          const { key } = await keyResponse.json();
          if(key) {
            console.log("Key : ", key);
            setMapsAPIKey(key);
          };
        }
      } catch(e) {
        console.log(e);
      }
    };

    getKey();
  }, []);

  return mapsAPIKey ? (
    <MapContainer>
      <GoogleMapReact
        bootstrapURLKeys={{ key: mapsAPIKey }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {children}
      </GoogleMapReact>
    </MapContainer>
  ) : (
    <Spinner />
  );
};

const MapContainer = styled.div`
  height: 100%;
  width: 100%;

  @media screen and (min-width: 1200px) {
    max-width: 1200px;
  }
`;
