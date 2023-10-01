import React, { useState } from "react";
import { styled } from "styled-components";
import FetchVenues from "../components/venues/FetchingVenues";
import SortingVenues from "../components/venues/SortingVenues";
import { useLocation } from "react-router-dom";
import { StyleSheetManager } from "styled-components";
import StaticSearchComponent from "../components/venues/SearchOnVenuePage";
import Width from "../styles/Width";
import ScrollToTop from "../components/scroll/ScrollUp";

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

  ${(props) => props.theme.media.desktop} {
    text-align: center;
  }
`;

const H1 = styled.h1`
  margin: 2px;
`;

const SearchAndVenuesContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${(props) => props.theme.media.desktop} {
    flex-direction: column;
  }
`;

const FilterDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 5px;
  ${(props) => props.theme.media.desktop} {
    flex-direction: column;
  }
`;

const FilterVenues = styled.div`
  display: flex;
  align-items: flex-end;

  ${(props) => props.theme.media.desktop} {
    justify-content: center;
  }
`;

const SearchAndContent = styled.div`
  display: flex;
  justify-content: space-between;

  ${(props) => props.theme.media.desktop} {
    flex-direction: column;
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
      <ScrollToTop />
      <VenuesSection>
        <Width>
          <VenuesWidth>
            <SearchAndVenuesContainer>
              <FilterDiv>
                <SiteTitle>
                  <H1>Venues</H1>
                </SiteTitle>

                <FilterVenues>
                  <SortingVenues onSortChange={handleSortChange} />
                </FilterVenues>
              </FilterDiv>
              <SearchAndContent>
                <StaticSearchComponent
                  onSearch={handleSearch}
                ></StaticSearchComponent>
                <FetchVenues
                  sortOrder={sortOrder}
                  countryFilter={countryFilter}
                  maxGuestsFilter={maxGuestsFilter}
                />
              </SearchAndContent>
            </SearchAndVenuesContainer>
          </VenuesWidth>
        </Width>
      </VenuesSection>
    </StyleSheetManager>
  );
}

export default Venues;
