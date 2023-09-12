import React from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const H2 = styled.h2`
  color: ${(props) => props.theme.color.c6};
`;

const H3 = styled.h3`
  margin-top: 0px;
`;

const Select = styled.select`
  cursor: pointer;
  background-color: ${(props) => props.theme.color.c5};
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.color.c1};
  font-size: 1rem;
`;

const StyledDateSpan = styled.span`
  cursor: pointer;
  background-color: ${(props) => props.theme.color.c5};
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.color.c1};
`;

const SelectedBooking = styled.span`
  margin-top: 15px;
`;

function BookingForm({
  selectedGuests,
  setSelectedGuests,
  guestOptions,
  dateRange,
  handleDateSelection,
  showDatePicker,
  setShowDatePicker,
  totalPrice,
}) {
  return (
    <BookingContainer>
      <H2>Booking</H2>
      <h3>Choose guest count</h3>
      <Select
        value={selectedGuests}
        onChange={(event) => setSelectedGuests(parseInt(event.target.value))}
      >
        {guestOptions.map((guestCount) => (
          <option key={guestCount} value={guestCount}>
            {guestCount} guest{guestCount !== 1 ? "s" : ""}
          </option>
        ))}
      </Select>
      <h3>Choose Booking Dates</h3>
      <StyledDateSpan onClick={() => setShowDatePicker(!showDatePicker)}>
        {dateRange[0] && dateRange[1]
          ? `${dateRange[0].toLocaleDateString()} - ${dateRange[1].toLocaleDateString()}`
          : "Check in - Check out"}
      </StyledDateSpan>
      {showDatePicker && (
        <DatePicker
          selected={dateRange[0]}
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          onChange={handleDateSelection}
          selectsRange
          inline
          dateFormat="dd/MM/yyyy"
        />
      )}
      <SelectedBooking>
        You have chosen{" "}
        <b>
          {selectedGuests} guests - Staying over{" "}
          {dateRange[0] && dateRange[1]
            ? Math.ceil((dateRange[1] - dateRange[0]) / (24 * 60 * 60 * 1000))
            : 0}{" "}
          Nights.
        </b>
      </SelectedBooking>
      <H3>Total: £{totalPrice},- </H3>
    </BookingContainer>
  );
}

export default BookingForm;
