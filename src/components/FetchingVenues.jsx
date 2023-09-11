import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faWifi,
  faCar,
  faDog,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";
import { fetchVenues } from "../API/apiVenues";

const VenuesContainer = styled.div`
  background-color: ${(props) => props.theme.color.c5};
  border-radius: 10px;
  padding: 10px 30px;
`;

const VenuesContent = styled.div`
  display: flex;
  border-radius: 10px;
  margin: 20px 0px;
  justify-content: space-between;
  box-shadow: 0px 0px 6px rgb(239, 243, 246);
  background-color: white;
  transition: color 0.3s, transform 0.3s;

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
  width: 300px;
  height: 300px;
  border-radius: 5px;
  overflow: hidden;
`;

const Featimg = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
`;

const VenueText = styled.div`
  padding: 5px 20px;
  color: ${(props) => props.theme.color.c4};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 200px;
`;

const VenueCountry = styled.span``;

const Metas = styled.div`
  display: flex;
  align-items: flex-start;
`;

const IconColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.color.c7};
`;

const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
  font-size: 0.8rem;
`;

const IconSpace = styled.div`
  padding: 8px 0;
`;

const IconTextSpace = styled.div`
  padding: 5px 0;
`;

const VenueMeta = styled.div`
  color: ${(props) => props.theme.color.c3};
`;

const VenueDescription = styled.p`
  width: 500px;
  overflow: hidden;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.color.c4};
`;

const VenuePrice = styled.p`
  display: flex;
  align-items: flex-end;
  margin: 16px;
  padding: 5px;
  font-size: 1.2rem;
  color: ${(props) => props.theme.color.c7};
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
        <Link to={`/Venue/${venue.id}`} key={venue.id}>
          <VenuesContent>
            <CardSplitter>
              <VenueImage>
                <Featimg
                  src={venue.media}
                  alt={venue.name}
                  onError={(e) => {
                    e.target.src =
                      "https://i.ytimg.com/vi/x6WcmrcQyaM/maxresdefault.jpg";
                  }}
                ></Featimg>
              </VenueImage>
              <VenueText>
                <div>
                  <VenueName>{venue.name}</VenueName>
                  <VenueCountry>{venue.location.country}</VenueCountry>
                </div>
                <VenueMeta>
                  <Metas>
                    <IconColumn>
                      <IconTextSpace>
                        <FontAwesomeIcon icon={faUser} />
                      </IconTextSpace>
                      {venue.meta.wifi && (
                        <IconTextSpace>
                          <FontAwesomeIcon icon={faWifi} />
                        </IconTextSpace>
                      )}
                      {venue.meta.parking && (
                        <IconTextSpace>
                          <FontAwesomeIcon icon={faCar} />
                        </IconTextSpace>
                      )}
                      {venue.meta.breakfast && (
                        <IconTextSpace>
                          <FontAwesomeIcon icon={faCoffee} />
                        </IconTextSpace>
                      )}
                      {venue.meta.pets && (
                        <IconTextSpace>
                          <FontAwesomeIcon icon={faDog} />
                        </IconTextSpace>
                      )}
                    </IconColumn>
                    <TextColumn>
                      <IconSpace> {venue.maxGuests}</IconSpace>
                      {venue.meta.wifi && <IconSpace>Wifi</IconSpace>}
                      {venue.meta.parking && <IconSpace>Parking</IconSpace>}
                      {venue.meta.breakfast && <IconSpace>Breakfast</IconSpace>}
                      {venue.meta.pets && <IconSpace>Pets</IconSpace>}
                    </TextColumn>
                  </Metas>
                </VenueMeta>
              </VenueText>
            </CardSplitter>
            <VenueDescription>
              {maxDescriptionSize(venue.description)}
            </VenueDescription>
            <VenuePrice>
              <b>Price: £{venue.price}</b>
            </VenuePrice>
          </VenuesContent>
        </Link>
      ))}
    </VenuesContainer>
  );
}

export default FetchVenues;
