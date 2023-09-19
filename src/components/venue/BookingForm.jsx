import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ThemedButton from "../../styles/Button";

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
  background-color: inherit;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.color.c3};
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

const OverlappMessage = styled.p`
  background-color: darkred;
  color: white;
  padding: 5px;
`;

const SuccessMsg = styled.div`
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
  const [loading, setLoading] = useState(false);

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
      }
    } catch (error) {
      console.error("An error occurred while making the booking:", error);
    } finally {
      setLoading(false);
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
    <BookingContainer onSubmit={handleBookingSubmit}>
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
      {successBooking ? (
        <a href="/Profile">
          <SuccessMsg>{successBooking}</SuccessMsg>
        </a>
      ) : (
        <div className="error"></div>
      )}
      <ThemedButton type="submit" disabled={loading}>
        {loading ? "Booking in progress..." : "Book Venue"}
      </ThemedButton>
    </BookingContainer>
  );
}

export default BookingForm;
