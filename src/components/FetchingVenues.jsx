import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { fetchVenues } from "../API/apiVenues";

const VenuesContainer = styled.div`
  padding: 10px;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: flex-end;
`;

const VenuesContent = styled.div`
  display: flex;
  border-radius: 5px;
  margin: 20px 0px;
  justify-content: space-between;
  box-shadow: 0px 0px 6px rgb(239, 243, 246);
  background-color: white;
  transition: color 0.3s, transform 0.3s;
  min-width: 80%;

  &:hover {
    background-color: ${(props) => props.theme.color.c2};
    transform: scale(1.01);
  }
`;

const VenueName = styled.h2`
  font-size: 1.2rem;
  margin: 0px;
  color: ${(props) => props.theme.color.c3};
`;

const VenueImage = styled.div`
  background-image: url(${(props) => props.image});
  width: 300px;
  height: 200px;
  background-repeat: no-repeat, no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 5px 0px 0px 5px;
`;

const VenueText = styled.div`
  padding: 5px 20px;
  color: ${(props) => props.theme.color.c4};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 200px;
`;

const VenueCountry = styled.div`
  background-color: ${(props) => props.theme.color.c6};
  color: ${(props) => props.theme.color.c5};
  padding: 5px 10px;
  border-radius: 5px 0px 5px 0px;
  box-shadow: 1px 1px 6px ${(props) => props.theme.color.c5};
  width: fit-content;
`;

const Country = styled.p`
  margin: 0px;
`;

const VenueDescription = styled.p`
  width: 500px;
  overflow: hidden;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.color.c4};
`;

const VenuePriceContainer = styled.p`
  color: ${(props) => props.theme.color.c3};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 10px;
`;

const Price = styled.b`
  font-size: 1.2rem;
`;

const CardSplitter = styled.div`
  display: flex;
`;

function FetchVenues({ sortOrder, countryFilter, maxGuestsFilter }) {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    async function getVenues() {
      const venues = await fetchVenues(sortOrder);

      const filteredVenues = venues.filter((venue) => {
        if (countryFilter && venue.location.country !== countryFilter) {
          return false;
        }

        if (maxGuestsFilter && maxGuestsFilter > venue.maxGuests) {
          return false;
        }

        return true;
      });

      setVenues(filteredVenues);
    }
    getVenues();
  }, [sortOrder, countryFilter, maxGuestsFilter]);

  const maxDescriptionSize = (description) => {
    const maxDescriptionLength = 200;
    return description.length > maxDescriptionLength
      ? description.slice(0, maxDescriptionLength) + "..."
      : description;
  };

  return (
    <VenuesContainer>
      {venues.map((venue) => (
        <StyledLink to={`/Venue/${venue.id}`} key={venue.id}>
          <VenuesContent>
            <CardSplitter>
              <VenueImage image={venue.media[0]}>
                <VenueCountry>
                  <Country>{venue.location.country}</Country>
                </VenueCountry>
              </VenueImage>
              <VenueText>
                <div>
                  <VenueName>{venue.name}</VenueName>
                </div>
                <VenueDescription>
                  {maxDescriptionSize(venue.description)}
                </VenueDescription>
              </VenueText>
            </CardSplitter>

            <VenuePriceContainer>
              <Price>£ {venue.price}</Price>
              <span>for 1 night per person</span>
            </VenuePriceContainer>
          </VenuesContent>
        </StyledLink>
      ))}
    </VenuesContainer>
  );
}

export default FetchVenues;
