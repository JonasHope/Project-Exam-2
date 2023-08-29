import React, { useState } from "react";
import { styled } from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel, faCalendar, faUser } from "@fortawesome/free-solid-svg-icons";

import "react-datepicker/dist/react-datepicker-cssmodules.css";
registerLocale("en-GB", enGB);

const SearchContainer = styled.div`
  background-color: ${(props) => props.theme.color.c5};
  padding: 10px 20px;
  border-radius: 0px 20px 0px 0px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SearchFormChildren = styled.div`
  padding: 5px 20px;
`;

const H3 = styled.h3`
  margin: 0px 0px 5px 0px;
`;

const ButtonSearch = styled.button`
  border: none;
  background-color: ${(props) => props.theme.color.c3};
  color: ${(props) => props.theme.color.c5};
  padding: 20px;
  border-radius: 5px;
  margin-left: 15px;
`;

const SelectGuests = styled.select`
  color: ${(props) => props.theme.color.c3};
  cursor: pointer;
  border: none;
  font-size: 16px;
  margin-right: 5px;
  padding: 0px 10px;
`;

const GuestOption = styled.option`
  padding: 20px;
`;

const Vl = styled.div`
  border-left: 2px solid ${(props) => props.theme.color.c4};
  height: 70px;
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

function SearchComponent() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateSelection = (dates) => {
    setDateRange(dates);

    if (dates[0] && dates[1]) {
      setShowDatePicker(false);
    }
  };

  return (
    <SearchContainer>
      <SearchForm>
        <SearchFormChildren>
          <H3>Location</H3>
          <span>Where are you going? </span>
          <FontAwesomeIcon icon={faHotel} style={{ color: "#ff7e5f" }} />
        </SearchFormChildren>
        <Vl></Vl>
        <SearchFormChildren>
          <H3>Date</H3>
          <DropdownWrapper>
            <StyledDateSpan onClick={() => setShowDatePicker(!showDatePicker)}>
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
        <ButtonSearch type="submit">Search Venues</ButtonSearch>
      </SearchForm>
    </SearchContainer>
  );
}

export default SearchComponent;
