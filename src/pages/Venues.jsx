import React, { useState } from "react";
import { styled } from "styled-components";
import SearchComponent from "../components/search/SearchComponent";
import FetchVenues from "../components/FetchingVenues";
import SortingVenues from "../components/SortingVenues";

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
  const [sortOrder, setSortOrder] = useState("desc");

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
  };

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
            <SortingVenues onSortChange={handleSortChange} />
          </FilterVenues>
        </FilterDiv>
        <FetchVenues sortOrder={sortOrder} />
      </VenuesWidth>
    </VenuesSection>
  );
}

export default Venues;
