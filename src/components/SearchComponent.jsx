import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faUser,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { fetchVenues } from "../API/api";

const SearchContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  margin-left: -300px;
  z-index: 1;
`;

const SearchContent = styled.div`
  background-color: ${(props) => props.theme.color.c5};
  width: 600px;
  margin: auto;
  padding: 2px 20px;
  border-radius: 20px 20px 0px 0px;
  transition: all 0.3s;
  transform: translateY(${(props) => (props.visible ? "0" : "100%")});
  border: 1px solid ${(props) => props.theme.color.c1};
  border-bottom: none;
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchFormChildren = styled.div`
  padding: 5px 20px;
`;

const H3 = styled.h4`
  margin: 0;
  margin-bottom: 5px;
`;

const ButtonSearch = styled.button`
  border: none;
  background-color: ${(props) => props.theme.color.c3};
  color: ${(props) => props.theme.color.c5};
  padding: 15px;
  border-radius: 5px;
  margin-left: 15px;
  cursor: pointer;
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
  border-left: 2px solid ${(props) => props.theme.color.c4};
  height: 40px;
  border-radius: 20px;
  margin: 0 10px;
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const HideSearch = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  width: 95%;
  margin: auto;
  text-align: center;
  border-radius: 20px 20px 0px 0px;
  transition: background-color 0.3s, transform 0.3s;
  transform: translateY(${(props) => (props.visible ? "0" : "310%")});
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.c3};
  }

  [aria-expanded="true"] > .chevron {
    transform: rotate(180deg);
  }
`;

const IconWrapper = styled.div`
  color: #352c4d;
  transform: rotate(${(props) => (props.chevronrotated ? "180deg" : "0deg")});
  transition: color 0.3s, transform 0.3s;

  ${HideSearch}:hover & {
    color: ${(props) => props.theme.color.c5};
  }
`;

const Select = styled.select`
  font-size: 1rem;
  border: none;
  cursor: pointer;
`;

function SearchComponent({ onSearch }) {
  const [searchContentVisible, setSearchContentVisible] = useState(true);
  const [chevronRotated, setChevronRotated] = useState(false);
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  const [country, setCountry] = useState("");
  const [maxGuests, setMaxGuests] = useState("");

  useEffect(() => {
    async function fetchCountries() {
      try {
        const venues = await fetchVenues("asc");
        const uniqueCountries = [
          ...new Set(venues.map((venue) => venue.location.country)),
        ];
        setCountries(uniqueCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    }

    fetchCountries();
  }, []);

  const toggleSearchContent = () => {
    setSearchContentVisible(!searchContentVisible);
    setChevronRotated(!chevronRotated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/Venues?country=${country}&maxGuests=${maxGuests}`);
    onSearch(country, maxGuests);
  };

  return (
    <SearchContainer>
      <HideSearch
        aria-label="hide searchbar"
        onClick={() => {
          setChevronRotated(!chevronRotated);
          toggleSearchContent();
        }}
        visible={searchContentVisible ? "true" : undefined}
      >
        <IconWrapper chevronRotated={chevronRotated ? "true" : undefined}>
          <FontAwesomeIcon icon={faChevronDown} />
        </IconWrapper>
      </HideSearch>
      <SearchContent visible={searchContentVisible ? "true" : undefined}>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormChildren>
            <H3>Location</H3>
            <DropdownWrapper>
              <Select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                name="country"
              >
                <option value="">Choose country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </Select>
            </DropdownWrapper>
            <FontAwesomeIcon icon={faHotel} style={{ color: "#ff7e5f" }} />
          </SearchFormChildren>
          <Vl></Vl>
          <SearchFormChildren>
            <H3>Guests</H3>
            <SelectGuests
              type="number"
              id="guests"
              name="guests"
              placeholder="Number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
            <FontAwesomeIcon icon={faUser} style={{ color: "#ff7e5f" }} />
          </SearchFormChildren>
          <ButtonSearch type="submit" aria-label="search button for venues">
            Search Venues
          </ButtonSearch>
        </SearchForm>
      </SearchContent>
    </SearchContainer>
  );
}

export default SearchComponent;
