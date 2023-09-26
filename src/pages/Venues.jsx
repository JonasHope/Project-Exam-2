import React, { useState } from "react";
import { styled } from "styled-components";
import FetchVenues from "../components/FetchingVenues";
import SortingVenues from "../components/SortingVenues";
import { useLocation } from "react-router-dom";
import { StyleSheetManager } from "styled-components";
import StaticSearchComponent from "../components/SearchOnVenuePage";
import Width from "../styles/Width";

const VenuesSection = styled.section`
  background-color: ${(props) => props.theme.color.c2};
`;

const VenuesWidth = styled.div`
  display: flex;
  margin: auto;
  padding: 5px;
  flex-direction: column;
  align-items: center;
`;

const SiteTitle = styled.div`
  padding: 5px 10px;
`;

const H1 = styled.h1`
  margin: 2px;
`;

const SearchAndVenuesContainer = styled.div`
  display: flex;
  justify-content: space-between;

  ${(props) => props.theme.media.desktop} {
    flex-direction: column;
  }
`;

const FilterDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 68%;

  ${(props) => props.theme.media.desktop} {
    flex-direction: column;
  }
`;

const FilterVenues = styled.div`
  padding: 10px;
  display: flex;
  align-items: flex-end;
`;

const Hr = styled.hr`
  width: 100%;
  display: none;

  ${(props) => props.theme.media.desktop} {
    display: block;
  }
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
    <StyleSheetManager
      shouldForwardProp={(prop) => !["visible"].includes(prop)}
    >
      <VenuesSection>
        <Width>
          <VenuesWidth>
            <FilterDiv>
              <SiteTitle>
                <H1>Venues</H1>
                <span>A list of all selected venues</span>
              </SiteTitle>
              <Hr></Hr>
              <FilterVenues>
                <SortingVenues onSortChange={handleSortChange} />
              </FilterVenues>
              <Hr></Hr>
            </FilterDiv>
            <SearchAndVenuesContainer>
              <StaticSearchComponent
                onSearch={handleSearch}
              ></StaticSearchComponent>

              <FetchVenues
                sortOrder={sortOrder}
                countryFilter={countryFilter}
                maxGuestsFilter={maxGuestsFilter}
              />
            </SearchAndVenuesContainer>
          </VenuesWidth>
        </Width>
      </VenuesSection>
    </StyleSheetManager>
  );
}

export default Venues;
