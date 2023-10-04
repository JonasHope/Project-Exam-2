import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ThemedButton from "../../styles/Button";
import LoginModal from "../account/Login";
import { Link } from "react-router-dom";

const BookingContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const H2 = styled.h2`
  color: ${(props) => props.theme.color.c6};
  margin: 0px;
`;

const H3 = styled.h3`
  margin: 12px 0px;
  font-size: 1rem;
`;

const TotalH3 = styled.h3`
  margin: 25px 0px;
`;

const Select = styled.select`
  cursor: pointer;
  background-color: ;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.color.c1};
  font-size: 0.9rem;
`;

const StyledDateSpan = styled.span`
  cursor: pointer;
  background-color: ${(props) => props.theme.color.c5};
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.color.c1};
  font-size: 0.9rem;
`;

const SelectedBooking = styled.span`
  margin-top: 15px;
`;

const OverlappMessage = styled.p`
  background-color: darkred;
  color: white;
  padding: 5px;
`;

const SuccessMsg = styled(Link)`
  padding: 10px;
  background-color: green;
  margin: 10px 0px;
  color: white;
`;

function BookingForm({
  selectedGuests,
  setSelectedGuests,
  guestOptions,
  dateRange,
  setDateRange,
  showDatePicker,
  setShowDatePicker,
  totalPrice,
  venueData,
}) {
  const [overlapError, setOverlapError] = useState("");
  const [successBooking, setSuccessBooking] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [errorBooking, setErrorBooking] = useState("");
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [buttonText, setButtonText] = useState(
    accessToken ? "Book Venue" : "Login to book venue"
  );

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    setAccessToken(storedAccessToken);
  }, []);

  const generateDisabledDates = () => {
    const disabledDates = [];
    venueData?.bookings.forEach((booking) => {
      const startDate = new Date(booking.dateFrom);
      const endDate = new Date(booking.dateTo);

      while (startDate <= endDate) {
        disabledDates.push(new Date(startDate));
        startDate.setDate(startDate.getDate() + 1);
      }
    });
    return disabledDates;
  };

  const handleBookingSubmit = async (event) => {
    try {
      event.preventDefault();
      const accessToken = localStorage.getItem("accessToken");

      if (!dateRange[0] || !dateRange[1]) {
        return;
      }

      const bookingData = {
        dateFrom: dateRange[0].toISOString(),
        dateTo: dateRange[1].toISOString(),
        guests: selectedGuests,
        venueId: venueData.id,
      };

      const response = await fetch(
        "https://api.noroff.dev/api/v1/holidaze/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(bookingData),
        }
      );

      if (response.ok) {
        setSuccessBooking(
          "Your booking was successful! Click here to view your bookings."
        );
      } else {
        setSuccessBooking("");
        setErrorBooking(
          "Failed booking, please choose check in and checkout dates."
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleBookVenueClick = () => {
    if (accessToken) {
      setButtonText("Book Venue");
      handleBookingSubmit();
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const disabledDates = generateDisabledDates();

  const handleDateSelection = (dates) => {
    const [startDate, endDate] = dates;
    const overlappingBooking = venueData.bookings.find(
      (booking) =>
        startDate <= new Date(booking.dateTo) &&
        endDate >= new Date(booking.dateFrom)
    );

    if (overlappingBooking) {
      setOverlapError("This date range overlaps with an existing booking.");
    } else {
      setOverlapError("");
      setDateRange(dates);
    }
  };

  return (
    <>
      <BookingContainer onSubmit={handleBookingSubmit}>
        <H2>Booking</H2>
        <H3>Choose guest count</H3>
        <Select
          value={selectedGuests}
          onChange={(event) => setSelectedGuests(parseInt(event.target.value))}
        >
          {guestOptions.map((guestCount) => (
            <option key={guestCount} value={guestCount}>
              {guestCount} Guest{guestCount !== 1 ? "s" : ""}
            </option>
          ))}
        </Select>
        <H3>Choose Booking Dates</H3>
        <StyledDateSpan onClick={() => setShowDatePicker(!showDatePicker)}>
          {dateRange[0] && dateRange[1]
            ? `${dateRange[0].toLocaleDateString()} - ${dateRange[1].toLocaleDateString()}`
            : "Check in - Check out"}
        </StyledDateSpan>
        {showDatePicker && (
          <div>
            <DatePicker
              selected={dateRange[0]}
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              onChange={handleDateSelection}
              selectsRange
              inline
              dateFormat="dd/MM/yyyy"
              excludeDates={disabledDates}
            />
            {overlapError && <OverlappMessage>{overlapError}</OverlappMessage>}
          </div>
        )}
        <SelectedBooking>
          You have chosen:{" "}
          <b>
            {selectedGuests} guests - Staying over{" "}
            {dateRange[0] && dateRange[1]
              ? Math.ceil((dateRange[1] - dateRange[0]) / (24 * 60 * 60 * 1000))
              : 0}{" "}
            Nights.
          </b>
        </SelectedBooking>
        <TotalH3>Total: £{totalPrice},- </TotalH3>
        <div>{errorBooking}</div>
        {successBooking && (
          <SuccessMsg to="/Profile">{successBooking}</SuccessMsg>
        )}
        <ThemedButton onClick={handleBookVenueClick}>{buttonText}</ThemedButton>
      </BookingContainer>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}

export default BookingForm;
