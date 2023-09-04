import React from "react";
import { styled } from "styled-components";
import SearchComponent from "../components/SearchComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import FetchVenues from "../components/FetchingVenues";

const VenuesSection = styled.section`
  background-color: ${(props) => props.theme.color.c2};
`;

const VenuesWidth = styled.div`
  max-width: 1440px;
  margin: auto;
  padding: 10px;
`;

const SiteTitle = styled.div`
  padding: 5px 10px;
`;

const H1 = styled.h1`
  margin-bottom: 2px;
`;

const FilterDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;

const FilterVenues = styled.div`
  padding: 5px;
  margin: 10px;
  display: flex;
  align-items: flex-end;
`;

function Venues() {
  return (
    <VenuesSection>
      <SearchComponent />
      <VenuesWidth>
        <FilterDiv>
          <SiteTitle>
            <H1>Venues</H1>
            <span>A list of all selected venues</span>
          </SiteTitle>
          <FilterVenues>
            <FontAwesomeIcon icon={faSliders} />
          </FilterVenues>
        </FilterDiv>
        <FetchVenues />
      </VenuesWidth>
    </VenuesSection>
  );
}

export default Venues;
