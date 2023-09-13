import React from "react";
import styled from "styled-components";

const FirstContainer = styled.div``;

const H1 = styled.h1`
  margin-top: 0px;
`;
const Country = styled.span``;
const Location = styled.span``;

function VenueHeader({ venueData }) {
  return (
    <FirstContainer>
      <H1>{venueData?.name}</H1>
      <Country>{venueData?.location?.country}</Country>
      {venueData?.location?.zip &&
        venueData?.location?.address !== "Unknown" && (
          <Location>
            {venueData?.location?.address} - {venueData?.location?.zip}
          </Location>
        )}
      {venueData?.location?.city !== "Unknown" && (
        <Location> {venueData?.location?.city}</Location>
      )}
      <hr />
    </FirstContainer>
  );
}

export default VenueHeader;
