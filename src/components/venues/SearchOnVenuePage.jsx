import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel, faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { fetchVenues } from "../../API/venue/apiVenues";
import ThemedButton from "../../styles/Button";
import CustomCountryDropdown from "../dropdowns/CountryDropdown";

const SearchContainer = styled.div`
  padding: 10px;

  ${(props) => props.theme.media.desktop} {
    padding: 0px;
  }
`;

const SearchContent = styled.div`
  margin: auto;
  border-radius: 5px;
  box-shadow: 0px 0px 3px ${(props) => props.theme.color.c4};
  padding: 10px;

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

  ${(props) => props.theme.media.desktop} {
    flex-direction: row;
    justify-content: center;
    margin-left: 43px;
  }
`;

const SearchFormChildren = styled.div`
  padding: 20px 0px;

  ${(props) => props.theme.media.desktop} {
    padding: 0px;
  }
`;

const H3 = styled.h4`
  margin: 0px 5px 2px 0px;

  ${(props) => props.theme.media.desktop} {
    display: none;
  }
`;

const GuestsPicker = styled.div`
  color: ${(props) => props.theme.color.c3};
  cursor: pointer;
  font-size: 16px;
  margin-right: 5px;
  width: 100px;
  height: 40px;
  border: 1px solid ${(props) => props.theme.color.c1};
  border-radius: 20px;
  background-color: ${(props) => props.theme.color.c5};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 10px;

  ${(props) => props.theme.media.desktop} {
    border-radius: 0px 20px 20px 0px;
  }
`;

const SelectGuests = styled.input`
  border: none;
  width: 80px;
  background-color: inherit;

  &::placeholder {
    color: ${(props) => props.theme.color.c3};
    font-size: 16px;
    font-family: "poppins-r";
  }
`;

const Vl = styled.div`
  border-bottom: 2px solid ${(props) => props.theme.color.c4};
  height: auto;
  width: 90%;
  margin: 10px 0px;
  border-radius: 20px;

  ${(props) => props.theme.media.desktop} {
    display: none;
  }
`;

const IconSpaceing = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  justify-content: center;
`;

const StyledThemedButton = styled(ThemedButton)`
  margin: 10px;
  border-radius: 50%;
  width: 45px;

  ${(props) => props.theme.media.desktop} {
    margin: 2px;
  }
`;

const ChildrenContainer = styled.div`
  ${(props) => props.theme.media.desktop} {
    display: flex;
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  ${(props) => props.theme.media.desktop} {
    display: none;
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
              .map((country) => country.charAt(0) + country.slice(1))
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
                <StyledFontAwesomeIcon
                  icon={faHotel}
                  style={{ color: "#ff7e5f" }}
                />
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
                <StyledFontAwesomeIcon
                  icon={faUser}
                  style={{ color: "#ff7e5f" }}
                />
              </IconSpaceing>
              <GuestsPicker>
                <SelectGuests
                  type="number"
                  id="guests"
                  name="guests"
                  placeholder="Guests"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                />
              </GuestsPicker>
            </SearchFormChildren>
          </ChildrenContainer>
          <StyledThemedButton
            type="submit"
            aria-label="search button for venues"
          >
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          </StyledThemedButton>
        </SearchForm>
      </SearchContent>
    </SearchContainer>
  );
}

export default StaticSearchComponent;
