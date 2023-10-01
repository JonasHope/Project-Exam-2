import React, { useState, useEffect } from "react";
import { styled, StyleSheetManager } from "styled-components";
import { Link } from "react-router-dom";
import { fetchVenues } from "../API/apiVenues";
import Pagination from "./Pagination";
import CustomLoader from "./loader/loader";

const VenuesContainer = styled.div`
  margin-left: 20px;

  ${(props) => props.theme.media.desktop} {
    width: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: auto;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: flex-end;

  ${(props) => props.theme.media.desktop} {
    margin: 5px 10px;
  }
`;

const VenuesContent = styled.div`
  display: flex;
  border-radius: 20px;
  margin: 5px 0px;
  justify-content: space-between;
  box-shadow: 0px 0px 2px ${(props) => props.theme.color.c4};
  background-color: white;
  transition: color 0.3s, transform 0.3s;
  min-width: 100%;

  &:hover {
    transform: scale(1.01);
  }

  ${(props) => props.theme.media.desktop} {
    flex-direction: column;
    min-width: 200px;
  }
`;

const NameAndCity = styled.div`
  padding: 5px 10px;
`;

const VenueName = styled.h2`
  font-size: 1.2rem;
  margin: 0px;
  color: ${(props) => props.theme.color.c3};
`;

const VenueImage = styled.div`
  background-image: url(${(props) => props.image});
  width: 250px;
  height: 150px;
  background-repeat: no-repeat, no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 20px 0px 0px 20px;

  ${(props) => props.theme.media.desktop} {
    border-radius: 20px 20px 0px 0px;
  }
`;

const VenueText = styled.div`
  padding: 0px;
  color: ${(props) => props.theme.color.c4};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 400px;

  ${(props) => props.theme.media.desktop} {
    max-width: 250px;
  }
`;

const VenueCountry = styled.div`
  background-color: ${(props) => props.theme.color.c6};
  color: ${(props) => props.theme.color.c5};
  padding: 5px 10px;
  border-radius: 20px 0px 20px 0px;
  box-shadow: 1px 1px 6px ${(props) => props.theme.color.c5};
  width: fit-content;
`;

const Country = styled.p`
  margin: 0px;
`;

const VenueRating = styled.div`
  display: flex;

  padding: 5px;
  align-items: center;
  color: ${(props) => props.theme.color.c3};
`;

const VenuePriceContainer = styled.div`
  color: ${(props) => props.theme.color.c3};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 10px;
  font-size: 0.8rem;
`;

const Price = styled.b`
  font-size: 1.2rem;
`;

const CardSplitter = styled.div`
  display: flex;

  ${(props) => props.theme.media.desktop} {
    flex-direction: column;
  }
`;

const Rating = styled.div`
  font-size: 0.8rem;
  background-color: green;
  color: ${(props) => props.theme.color.c5}
  padding: 2px 5px;
  border-radius: 5px;
`;

const RatingSpan = styled.span`
  margin-left: 4px;
  font-size: 0.8rem;
`;

function FetchVenues({ sortOrder, countryFilter, maxGuestsFilter }) {
  const [venues, setVenues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

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

      const calculatedTotalPages = Math.ceil(filteredVenues.length / 20);
      setTotalPages(calculatedTotalPages);
      setLoading(false);
    }
    getVenues();
  }, [sortOrder, countryFilter, maxGuestsFilter]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <StyleSheetManager shouldForwardProp={(prop) => !["active"].includes(prop)}>
      <VenuesContainer>
        {loading ? (
          <CustomLoader />
        ) : (
          venues
            .slice((currentPage - 1) * 20, currentPage * 20)
            .map((venue) => (
              <StyledLink to={`/Venue/${venue.id}`} key={venue.id}>
                <VenuesContent>
                  <CardSplitter>
                    <VenueImage image={venue.media[0]}>
                      <VenueCountry>
                        <Country>{venue.location.country}</Country>
                      </VenueCountry>
                    </VenueImage>
                    <VenueText>
                      <NameAndCity>
                        <VenueName>{venue.name}</VenueName>
                        <span>{venue.location.city}</span>
                      </NameAndCity>
                      <VenueRating>
                        <Rating>{venue.rating}</Rating>
                        <RatingSpan>Rating</RatingSpan>
                      </VenueRating>
                    </VenueText>
                  </CardSplitter>

                  <VenuePriceContainer>
                    <Price>£ {venue.price}</Price>
                    <span>for 1 night per person</span>
                  </VenuePriceContainer>
                </VenuesContent>
              </StyledLink>
            ))
        )}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </VenuesContainer>
    </StyleSheetManager>
  );
}

export default FetchVenues;
