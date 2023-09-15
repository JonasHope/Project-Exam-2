import React from "react";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";

const MapContainer = styled.div`
  width: 100%;
  height: 250px;
`;

function LocationTab({ venueData }) {
  const MapLocation = {
    center: {
      lat: venueData?.location?.lat,
      lng: venueData?.location?.lng,
    },
    zoom: 11,
  };

  return (
    <MapContainer>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={MapLocation.center}
        defaultZoom={MapLocation.zoom}
      ></GoogleMapReact>
    </MapContainer>
  );
}

export default LocationTab;
