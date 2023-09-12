import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { fetchVenues } from "../API/apiVenues";
import ThemedButton from "../styles/Button";

const SearchContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  margin-left: -300px;
  z-index: 1;

  ${(props) => props.theme.media.mobile} {
    left: 0;
    bottom: 50%;
    margin-left: auto;
    margin-bottom: -143px;
    display: flex;
    flex-direction: row-reverse;
  }
`;

const SearchContent = styled.div`
  background-color: ${(props) => props.theme.color.c5};
  width: 600px;
  margin: auto;
  padding: 2px 20px;

  transition: all 0.3s;
  transform: translateY(${(props) => (props.visible ? "0" : "100%")});
  border: 1px solid ${(props) => props.theme.color.c1};
  border-bottom: none;

  ${(props) => props.theme.media.mobile} {
    height: 250px;
    width: auto;
    margin: auto;
    padding: 2px 20px;
    border-bottom: 1px solid ${(props) => props.theme.color.c1};
    border-left: none;
    display: flex;
    padding: 20px 10px;
    transform: translateX(${(props) => (props.visible ? "0" : "-100%")});
  }
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${(props) => props.theme.media.mobile} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SearchFormChildren = styled.div`
  padding: 5px 20px;

  ${(props) => props.theme.media.mobile} {
    padding: 10px 0px;
  }
`;

const H3 = styled.h4`
  margin: 0px 5px 2px 5px;
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

  ${(props) => props.theme.media.mobile} {
    border-bottom: 2px solid ${(props) => props.theme.color.c4};
    height: auto;
    width: 70%;
    margin: 10px 0px;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const HideSearch = styled.div`
  background-color: ${(props) => props.theme.color.c3};
  padding: 5px;
  border-radius: 20px 20px 0px 0px;
  transition: background-color 0.3s, transform 0.3s;
  transform: translateY(${(props) => (props.visible ? "0" : "365%")});
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${(props) => props.theme.color.c3};
  }

  [aria-expanded="true"] > .chevron {
    transform: rotate(180deg);
  }

  ${(props) => props.theme.media.mobile} {
    transform: translateX(${(props) => (props.visible ? "0" : "-495%")});

    width: 20px;
    border-radius: 0px 20px 20px 0px;
  }
`;

const IconWrapper = styled.div`
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 12px solid ${(props) => props.theme.color.c5};
  transition: transform 0.3s;
  transform: rotate(${(props) => (props.iconrotate ? "180deg" : "0deg")});

  ${(props) => props.theme.media.mobile} {
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 12px solid ${(props) => props.theme.color.c5};
    border-left: 0px;
  }
`;

const Select = styled.select`
  font-size: 1rem;
  border: none;
  cursor: pointer;
`;

const IconSpaceing = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

function SearchComponent({ onSearch }) {
  const [searchContentVisible, setSearchContentVisible] = useState(true);
  const [iconrotate, seticonrotate] = useState(false);
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
    seticonrotate(!iconrotate);
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
          seticonrotate(!iconrotate);
          toggleSearchContent();
        }}
        visible={searchContentVisible ? "true" : undefined}
      >
        <IconWrapper iconrotate={iconrotate ? "true" : undefined}></IconWrapper>
      </HideSearch>
      <SearchContent visible={searchContentVisible ? "true" : undefined}>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormChildren>
            <IconSpaceing>
              <H3>Location</H3>
              <FontAwesomeIcon icon={faHotel} style={{ color: "#ff7e5f" }} />
            </IconSpaceing>
            <DropdownWrapper>
              <Select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                name="country"
              >
                <option value="" disabled>
                  Select Country
                </option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </Select>
            </DropdownWrapper>
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
          <ThemedButton type="submit" aria-label="search button for venues">
            Search Venues
          </ThemedButton>
        </SearchForm>
      </SearchContent>
    </SearchContainer>
  );
}

export default SearchComponent;
