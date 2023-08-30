import React, { useState } from "react";
import { styled } from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faCalendar,
  faUser,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const SearchContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  margin-left: -400px;
  z-index: 1;
`;

const SearchContent = styled.div`
  background-color: ${(props) => props.theme.color.c5};
  width: 800px;
  margin: auto;
  padding: 2px 20px;
  border-radius: 20px 20px 0px 0px;
  transition: all 0.3s; /* Adding a transition for smooth sliding */
  transform: translateY(${(props) => (props.visible ? "0" : "100%")});
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchFormChildren = styled.div`
  padding: 5px 20px;
`;

const H3 = styled.h4`
  margin: 0px 0px 5px 0px;
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

const SelectGuests = styled.select`
  color: ${(props) => props.theme.color.c3};
  cursor: pointer;
  border: none;
  font-size: 1rem;
  margin-right: 5px;
`;

const GuestOption = styled.option``;

const Vl = styled.div`
  border-left: 2px solid ${(props) => props.theme.color.c4};
  height: 40px;
  border-radius: 20px;
  margin: 0px 10px;
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledDropdown = styled.div`
  position: absolute;
  left: -30px;
  bottom: 60px;
  z-index: 2;
`;

const StyledDateSpan = styled.span`
  cursor: pointer;
  margin-right: 10px;
`;

const HideSearch = styled.div`
  background-color: rgb(0, 0, 0, 0.1);
  width: 95%;
  margin: auto;
  text-align: center;
  border-radius: 20px 20px 0px 0px;
  transition: background-color 0.3s, transform 0.3s;
  transform: translateY(${(props) => (props.visible ? "0" : "280%")});
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

function SearchComponent() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [searchContentVisible, setSearchContentVisible] = useState(true);
  const [chevronrotated, setchevronrotated] = useState(false);
  const navigate = useNavigate();

  const handleDateSelection = (dates) => {
    setDateRange(dates);

    if (dates[0] && dates[1]) {
      setShowDatePicker(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const startDate = dateRange[0] ? dateRange[0].toLocaleDateString() : "";
    const endDate = dateRange[1] ? dateRange[1].toLocaleDateString() : "";
    const guests = e.target.guests.value;

    const searchQuery = `?start=${startDate}&end=${endDate}&guests=${guests}`;

    navigate(`/Venues${searchQuery}`);
  };

  const toggleSearchContent = () => {
    setSearchContentVisible(!searchContentVisible);
    setchevronrotated(!chevronrotated);
  };

  return (
    <SearchContainer>
      <HideSearch
        aria-label="hide searchbar"
        onClick={() => {
          setchevronrotated(!chevronrotated);
          toggleSearchContent();
        }}
        visible={searchContentVisible ? "true" : undefined}
      >
        <IconWrapper chevronrotated={chevronrotated ? "true" : undefined}>
          <FontAwesomeIcon icon={faChevronDown} />
        </IconWrapper>
      </HideSearch>
      <SearchContent visible={searchContentVisible ? "true" : undefined}>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormChildren>
            <H3>Location</H3>
            <span>Where are you going? </span>
            <FontAwesomeIcon icon={faHotel} style={{ color: "#ff7e5f" }} />
          </SearchFormChildren>
          <Vl></Vl>
          <SearchFormChildren>
            <H3>Date</H3>
            <DropdownWrapper>
              <StyledDateSpan
                onClick={() => setShowDatePicker(!showDatePicker)}
              >
                {dateRange[0] && dateRange[1]
                  ? `${dateRange[0].toLocaleDateString()} - ${dateRange[1].toLocaleDateString()}`
                  : "Check in - Check out"}
              </StyledDateSpan>
              {showDatePicker && (
                <StyledDropdown>
                  <DatePicker
                    selected={dateRange[0]}
                    startDate={dateRange[0]}
                    endDate={dateRange[1]}
                    onChange={handleDateSelection}
                    selectsRange
                    inline
                    locale="en-GB"
                    dateFormat="dd/MM/yyyy"
                  />
                </StyledDropdown>
              )}
            </DropdownWrapper>
            <FontAwesomeIcon icon={faCalendar} style={{ color: "#ff7e5f" }} />
          </SearchFormChildren>
          <Vl></Vl>
          <SearchFormChildren>
            <H3>Guests</H3>
            <SelectGuests id="guests" name="guests">
              <GuestOption value="1">1 Guest</GuestOption>
              <GuestOption value="2">2 Guests</GuestOption>
              <GuestOption value="3">3 Guests</GuestOption>
              <GuestOption value="4">4 Guests</GuestOption>
            </SelectGuests>
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
