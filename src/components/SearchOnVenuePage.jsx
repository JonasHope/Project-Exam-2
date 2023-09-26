import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { fetchVenues } from "../API/apiVenues";
import ThemedButton from "../styles/Button";
import CustomCountryDropdown from "./CountryDropdown";

const SearchContainer = styled.div`
  padding: 10px;

  ${(props) => props.theme.media.desktop} {
    padding: 0px;
  }
`;

const SearchContent = styled.div`
  margin: auto;
  border-radius: 5px;
  width: 100%;
  box-shadow: 0px 0px 1px 2px ${(props) => props.theme.color.c1};

  ${(props) => props.theme.media.desktop} {
    background-color: inherit;
    box-shadow: none;
  }
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 5px;
`;

const SearchFormChildren = styled.div`
  padding: 20px 0px;

  ${(props) => props.theme.media.desktop} {
    padding: 5px 20px;
  }
`;

const H3 = styled.h4`
  margin: 0px 5px 2px 0px;
`;

const SelectGuests = styled.input`
  color: ${(props) => props.theme.color.c3};
  cursor: pointer;
  font-size: 1rem;
  margin-right: 5px;
  width: 80px;
  padding: 5px;
  border: 2px solid ${(props) => props.theme.color.c1};
  border-radius: 10px;
  background-color: ${(props) => props.theme.color.c5};
`;

const Vl = styled.div`
  border-bottom: 2px solid ${(props) => props.theme.color.c4};
  height: auto;
  width: 90%;
  margin: 10px 0px;
  border-radius: 20px;
`;

const IconSpaceing = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const StyledThemedButton = styled(ThemedButton)`
  margin: 20px;

  ${(props) => props.theme.media.desktop} {
    margin: 5px 20px;
  }
`;

const ChildrenContainer = styled.div`
  ${(props) => props.theme.media.desktop} {
    display: flex;
  }
`;

function StaticSearchComponent({ onSearch }) {
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  const [country, setCountry] = useState("");
  const [maxGuests, setMaxGuests] = useState("");

  useEffect(() => {
    async function fetchCountries() {
      try {
        const venues = await fetchVenues("asc");
        const uniqueCountries = [
          ...new Set(
            venues
              .map((venue) => venue.location.country)
              .filter((country) => country.trim() !== "")
              .map((country) => country.trim())
              .map(
                (country) => country.charAt(0).toUpperCase() + country.slice(1)
              )
          ),
        ];
        setCountries(uniqueCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    }

    fetchCountries();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/Venues?country=${country}&maxGuests=${maxGuests}`);
    onSearch(country, maxGuests);
  };

  return (
    <SearchContainer>
      <SearchContent>
        <SearchForm onSubmit={handleSubmit}>
          <ChildrenContainer>
            <SearchFormChildren>
              <IconSpaceing>
                <H3>Location</H3>
                <FontAwesomeIcon icon={faHotel} style={{ color: "#ff7e5f" }} />
              </IconSpaceing>

              <CustomCountryDropdown
                options={countries}
                value={country}
                onChange={setCountry}
              />
            </SearchFormChildren>
            <Vl></Vl>
            <SearchFormChildren>
              <IconSpaceing>
                <H3>Guests</H3>
                <FontAwesomeIcon icon={faUser} style={{ color: "#ff7e5f" }} />
              </IconSpaceing>
              <SelectGuests
                type="number"
                id="guests"
                name="guests"
                placeholder="Number"
                value={maxGuests}
                onChange={(e) => setMaxGuests(e.target.value)}
              />
            </SearchFormChildren>
          </ChildrenContainer>
          <StyledThemedButton
            type="submit"
            aria-label="search button for venues"
          >
            Search Venues
          </StyledThemedButton>
        </SearchForm>
      </SearchContent>
    </SearchContainer>
  );
}

export default StaticSearchComponent;
