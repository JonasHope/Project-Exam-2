import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchVenue } from "../API/apiVenues";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.module.css";
import Width from "../styles/Width";
import calculateTotalPrice from "../components/venue/CalculatePrice";
import VenueHeader from "../components/venue/VenueHeader";
import BookingForm from "../components/venue/BookingForm";

const VenueContainer = styled.div`
  background-color: ${(props) => props.theme.color.c2};
  height: 100%;
`;

const BookingInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`;

function Venue() {
  const [venueData, setVenueData] = useState(null);
  const { id } = useParams();
  const [dateRange, setDateRange] = useState([null, null]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [maxGuests, setMaxGuests] = useState(null);
  const [selectedGuests, setSelectedGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchVenue(id)
      .then((data) => {
        setVenueData(data);
        setMaxGuests(data.maxGuests);
      })
      .catch((error) => {
        console.error("Error fetching venue:", error);
      });
  }, [id]);

  useEffect(() => {
    const total = calculateTotalPrice(venueData, dateRange, selectedGuests);
    setTotalPrice(total);
  }, [venueData, selectedGuests, dateRange]);

  const handleDateSelection = (dates) => {
    setDateRange(dates);

    if (dates[0] && dates[1]) {
      setShowDatePicker(false);
    }
  };

  return (
    <VenueContainer>
      <Width>
        <BookingInfoContainer>
          <VenueHeader venueData={venueData} />
          <BookingForm
            selectedGuests={selectedGuests}
            setSelectedGuests={setSelectedGuests}
            guestOptions={
              maxGuests
                ? Array.from({ length: maxGuests }, (_, index) => index + 1)
                : []
            }
            dateRange={dateRange}
            handleDateSelection={handleDateSelection}
            showDatePicker={showDatePicker}
            setShowDatePicker={setShowDatePicker}
            totalPrice={totalPrice}
          />
        </BookingInfoContainer>
      </Width>
    </VenueContainer>
  );
}

export default Venue;
