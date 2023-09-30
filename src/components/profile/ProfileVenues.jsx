import React, { useState, useEffect, useRef } from "react";
import styled, { StyleSheetManager } from "styled-components";
import { Link } from "react-router-dom";
import ThemedButton from "../../styles/Button";
import { deleteVenue } from "../../API/apiDeleteVenue";
import { fetchVenueBookings } from "../../API/apiUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import UpdateVenue from "../../pages/UpdateVenue";

const ProfileVenuesContainer = styled.div`
  min-height: 100vh;
  margin: 10px;
  padding: 20px;
  border-radius: 10px;
`;

const ProfileVenue = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${(props) => props.theme.media.mobile} {
    flex-direction: column;
    text-align: center;
  }
`;

const H2 = styled.h2`
  margin: 0px;
  font-size: 1rem;
`;

const ModalBackdrop = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const DeleteConfirmationModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  z-index: 1001;
`;

const TheButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const OpenDeleteVenueButton = styled(ThemedButton)`
  padding: 5px 10px;
  background-color: inherit;
  color: darkred;
  font-weight: bold;

  &:hover {
    background-color: ${(props) => props.theme.color.c2};
  }
`;

const StyledThemedButton = styled(ThemedButton)`
  background-color: darkred;
`;

const ViewBookingsOnVenueButton = styled(ThemedButton)`
  padding: 5px 10px;
  background-color: inherit;
  color: ${(props) => props.theme.color.c3};
  font-weight: bold;

  &:hover {
    background-color: ${(props) => props.theme.color.c2};
  }
`;

const VenueDropdown = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1002;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 400px;
  overflow-y: scroll;
  width: 300px;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 3px;
  right: 3px;
  color: ${(props) => props.theme.color.c3};
  padding: 5px;
  cursor: pointer;
`;

const BookingInfoList = styled.li`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: 20px;
`;

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: column;
`;

const Label = styled.div`
  flex: 1;
`;

const ValueRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: column;
`;

const Value = styled.div`
  flex: 1;
`;

const H3 = styled.h3`
  text-align: center;
`;

const UlForBookingList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
};

function ProfileVenues() {
  const [venueToDelete, setVenueToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookingsData, setBookingsData] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const venues = await fetchVenueBookings();
        setBookingsData(venues);
      } catch (error) {
        console.error("Failed to fetch venue data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSelectedVenue(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDeleteClick = (venueId) => {
    setVenueToDelete(venueId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteVenue(venueToDelete);
      setShowDeleteModal(false);
      setBookingsData((prevData) =>
        prevData.filter((venue) => venue.id !== venueToDelete)
      );
    } catch (error) {
      console.error("Failed to delete venue:", error);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setVenueToDelete(null);
  };

  const handleVenueDropdown = async (venue) => {
    if (selectedVenue === venue.id) {
      setSelectedVenue(null);
    } else {
      try {
        setSelectedVenue(venue.id);
      } catch (error) {
        console.error("Failed to fetch venue bookings:", error);
      }
    }
  };

  const handleUpdateVenue = (updatedVenueData) => {
    console.log("Venue updated:", updatedVenueData);
  };

  return (
    <StyleSheetManager
      shouldForwardProp={(prop) => !["visible"].includes(prop)}
    >
      <ProfileVenuesContainer>
        {bookingsData.map((bookingData) => (
          <div key={bookingData.id}>
            <ProfileVenue>
              <Link to={`/Venue/${bookingData.id}`}>
                <H2>{bookingData.name}</H2>
              </Link>
              <ButtonGroup>
                <UpdateVenue
                  bookingData={bookingData}
                  onUpdateVenue={handleUpdateVenue}
                />
                <ViewBookingsOnVenueButton
                  onClick={() => handleVenueDropdown(bookingData)}
                >
                  {selectedVenue === bookingData.id ? "Close" : "View Bookings"}
                </ViewBookingsOnVenueButton>
                <OpenDeleteVenueButton
                  onClick={() => handleDeleteClick(bookingData.id)}
                >
                  Delete Venue
                </OpenDeleteVenueButton>
              </ButtonGroup>
              <VenueDropdown
                visible={selectedVenue === bookingData.id}
                ref={dropdownRef}
              >
                <CloseButton onClick={() => setSelectedVenue(null)}>
                  <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
                </CloseButton>
                <H3>Bookings for {bookingData.name}</H3>
                <UlForBookingList>
                  {bookingData.bookings.map((booking) => (
                    <div key={booking.id}>
                      <BookingInfoList>
                        <LabelRow>
                          <Label>From:</Label>
                          <Label>To:</Label>
                          <Label>Guests:</Label>
                        </LabelRow>
                        <ValueRow>
                          <Value>
                            <b>{formatDate(booking.dateFrom)}</b>
                          </Value>
                          <Value>
                            <b>{formatDate(booking.dateTo)}</b>
                          </Value>
                          <Value>
                            <b>{booking.guests}</b>
                          </Value>
                        </ValueRow>
                      </BookingInfoList>
                      <hr />
                    </div>
                  ))}
                </UlForBookingList>
              </VenueDropdown>
            </ProfileVenue>
            <hr />
          </div>
        ))}
      </ProfileVenuesContainer>

      <ModalBackdrop visible={showDeleteModal}>
        <DeleteConfirmationModal>
          <p>Are you sure you want to delete this venue?</p>
          <TheButtons>
            <StyledThemedButton onClick={handleDeleteConfirm}>
              Yes
            </StyledThemedButton>
            <ThemedButton onClick={handleDeleteCancel}>No</ThemedButton>
          </TheButtons>
        </DeleteConfirmationModal>
      </ModalBackdrop>
    </StyleSheetManager>
  );
}

export default ProfileVenues;
