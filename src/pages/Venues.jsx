import React, { useState } from "react";
import { styled } from "styled-components";
import FetchVenues from "../components/FetchingVenues";
import SortingVenues from "../components/SortingVenues";
import SearchComponent from "../components/SearchComponent";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [sortOrder, setSortOrder] = useState("desc");
  const countryFilter = queryParams.get("country") || "";
  const maxGuestsFilter = queryParams.get("maxGuests") || "";

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
  };

  const handleSearch = (country, guests) => {
    const newQueryParams = new URLSearchParams(location.search);
    if (country) {
      newQueryParams.set("country", country);
    } else {
      newQueryParams.delete("country");
    }
    if (guests) {
      newQueryParams.set("maxGuests", guests);
    } else {
      newQueryParams.delete("maxGuests");
    }

    const newURL = `${location.pathname}?${newQueryParams.toString()}`;

    window.location.href = newURL;

    setSortOrder("desc");
  };

  return (
    <VenuesSection>
      <SearchComponent onSearch={handleSearch} />
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
        <FetchVenues
          sortOrder={sortOrder}
          countryFilter={countryFilter}
          maxGuestsFilter={maxGuestsFilter}
        />
      </VenuesWidth>
    </VenuesSection>
  );
}

export default Venues;
