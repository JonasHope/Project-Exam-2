import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchVenue } from "../API/apiVenues";
import styled from "styled-components";

const VenueContainer = styled.div`
  background-color: ${(props) => props.theme.color.c2};
  height: 100%;
`;

const FirstContainer = styled.div`
  width: 30%;
`;

const H1 = styled.h1``;

const Country = styled.span`
  display: flex;
`;

const Location = styled.span``;

const SecondContainer = styled.div``;

function Venue() {
  const [venueData, setVenueData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchVenue(id)
      .then((data) => {
        setVenueData(data);
      })
      .catch((error) => {
        console.error("Error fetching venue:", error);
      });
  }, [id]);

  console.log(venueData);

  return (
    <VenueContainer>
      <FirstContainer></FirstContainer>
      {venueData ? (
        <>
          <FirstContainer>
            <H1>{venueData.name}</H1>
            <Country>{venueData.location.country} </Country>
            {venueData.location.zip &&
              venueData.location.address !== "Unknown" && (
                <Location>
                  {venueData.location.address} - {venueData.location.zip}
                </Location>
              )}
            {venueData.location.city !== "Unknown" && (
              <Location> {venueData.location.city}</Location>
            )}
            <hr></hr>
          </FirstContainer>
          <SecondContainer></SecondContainer>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </VenueContainer>
  );
}

export default Venue;
