import React from "react";
import styled from "styled-components";

const FirstContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Hr = styled.hr`
  width: 100%;
  border: 1px solid ${(props) => props.theme.color.c3};
  border-radius: 10px;
`;

const H1 = styled.h1`
  margin-top: 0px;
`;
const Country = styled.span``;
const Location = styled.span``;

function VenueHeader({ venueData }) {
  return (
    <FirstContainer>
      <H1>{venueData?.name}</H1>
      <Country>{venueData?.location?.country} </Country>
      <div>
        {venueData?.location?.zip &&
          venueData?.location?.address !== "Unknown" && (
            <Location>
              {venueData?.location?.address} - {venueData?.location?.zip}
            </Location>
          )}
        {venueData?.location?.city !== "Unknown" && (
          <Location> {venueData?.location?.city}</Location>
        )}
      </div>
      <Hr />
    </FirstContainer>
  );
}

export default VenueHeader;
