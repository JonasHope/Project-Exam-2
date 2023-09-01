import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import SearchComponent from "../components/SearchComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faWifi,
  faCar,
  faDog,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";

const VenuesSection = styled.section`
  background-color: ${(props) => props.theme.color.c2};
`;

const VenuesWidth = styled.div`
  max-width: 1440px;
  margin: auto;
  padding: 10px;
`;

const VenuesContainer = styled.div`
  background-color: ${(props) => props.theme.color.c5};
  border-radius: 10px;
  padding: 30px;
`;

const VenuesContent = styled.div`
  display: flex;
  border-radius: 10px;
  margin: 10px;

  &:hover {
    background-color: ${(props) => props.theme.color.c2};
  }
`;

const SiteTitle = styled.div`
  padding: 20px;
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

const H1 = styled.h1`
  margin-bottom: 2px;
`;

const VenueText = styled.div`
  padding: 0px 20px;
  color: ${(props) => props.theme.color.c4};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const VenueCountry = styled.span``;

const Metas = styled.div`
  display: flex;
  align-items: flex-start;
`;

const IconColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
`;

const IconSpace = styled.div`
  padding: 5px 0;
`;

const VenueMeta = styled.div`
  color: ${(props) => props.theme.color.c3};
`;

function Venues() {
  const url = "https://api.noroff.dev/api/v1/holidaze/venues";

  const [venues, setVenues] = useState([]);
  useEffect(() => {
    async function getVenues() {
      const response = await fetch(url);
      const json = await response.json();
      setVenues(json);
    }
    getVenues();
  }, []);

  return (
    <VenuesSection>
      <SearchComponent />
      <VenuesWidth>
        <SiteTitle>
          <H1>Venues</H1>
          <span>A list of all selected venues</span>
        </SiteTitle>
        <VenuesContainer>
          {venues.map((venue) => (
            <Link to={`/Venue/${venue.id}`} key={venue.id}>
              <VenuesContent>
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
                        <IconSpace>
                          <FontAwesomeIcon icon={faUser} />
                        </IconSpace>
                        {venue.meta.wifi && (
                          <IconSpace>
                            <FontAwesomeIcon icon={faWifi} />
                          </IconSpace>
                        )}
                        {venue.meta.parking && (
                          <IconSpace>
                            <FontAwesomeIcon icon={faCar} />
                          </IconSpace>
                        )}
                        {venue.meta.breakfast && (
                          <IconSpace>
                            <FontAwesomeIcon icon={faCoffee} />
                          </IconSpace>
                        )}
                        {venue.meta.pets && (
                          <IconSpace>
                            <FontAwesomeIcon icon={faDog} />
                          </IconSpace>
                        )}
                      </IconColumn>
                      <TextColumn>
                        <IconSpace> {venue.maxGuests}</IconSpace>

                        {venue.meta.wifi && <IconSpace>Wifi</IconSpace>}
                        {venue.meta.parking && <IconSpace>Parking</IconSpace>}
                        {venue.meta.breakfast && (
                          <IconSpace>Breakfast</IconSpace>
                        )}
                        {venue.meta.pets && <IconSpace>Pets</IconSpace>}
                      </TextColumn>
                    </Metas>
                  </VenueMeta>
                </VenueText>
              </VenuesContent>
            </Link>
          ))}
        </VenuesContainer>
      </VenuesWidth>
    </VenuesSection>
  );
}
export default Venues;
