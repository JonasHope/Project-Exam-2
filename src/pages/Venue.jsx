import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchVenue } from "../API/venue/apiVenues";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.module.css";
import Width from "../styles/Width";
import calculateTotalPrice from "../components/venue/CalculatePrice";
import VenueHeader from "../components/venue/VenueHeader";
import BookingForm from "../components/venue/BookingForm";
import VenueInformation from "../components/venue/VenueContent";
import GoBackClick from "../components/backbutton/BackButton";
import CustomLoader from "../components/loader/loader";

const VenueContainer = styled.div`
  background-color: ${(props) => props.theme.color.c2};
  padding: 10px;
`;

const VenueLayout = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  ${(props) => props.theme.media.desktop} {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

const BookingInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;

  ${(props) => props.theme.media.desktop} {
    width: 70%;
    margin-bottom: 30px;
  }
`;

function Venue() {
  const [venueData, setVenueData] = useState(null);
  const { id } = useParams();
  const [dateRange, setDateRange] = useState([null, null]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [maxGuests, setMaxGuests] = useState(null);
  const [selectedGuests, setSelectedGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVenue(id)
      .then((data) => {
        setVenueData(data);
        setMaxGuests(data.maxGuests);
        setLoading(false);
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
        {loading ? (
          <CustomLoader />
        ) : (
          <>
            <GoBackClick />
            <VenueLayout>
              <BookingInfoContainer>
                <VenueHeader venueData={venueData} />
                <BookingForm
                  venueData={venueData}
                  selectedGuests={selectedGuests}
                  setSelectedGuests={setSelectedGuests}
                  setDateRange={setDateRange}
                  guestOptions={
                    maxGuests
                      ? Array.from(
                          { length: maxGuests },
                          (_, index) => index + 1
                        )
                      : []
                  }
                  dateRange={dateRange}
                  handleDateSelection={handleDateSelection}
                  showDatePicker={showDatePicker}
                  setShowDatePicker={setShowDatePicker}
                  totalPrice={totalPrice}
                />
              </BookingInfoContainer>
              <VenueInformation venueData={venueData} />
            </VenueLayout>
          </>
        )}
      </Width>
    </VenueContainer>
  );
}

export default Venue;
