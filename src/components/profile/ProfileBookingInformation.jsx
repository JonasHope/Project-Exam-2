import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ThemedButton from "../../styles/Button";
import { deleteBooking } from "../../API/apiBookings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import UpdateBookingModal from "./UpdateBooking";

const ProfileBookingContainer = styled.div`
  padding: 10px;
  margin: 10px;
  min-height: 100vh;
`;

const BookedVenues = styled.div`
  display: flex;
  margin: 10px;
`;

const BookingCards = styled.div`
  display: flex;
  justify-content: space-between;

  ${(props) => props.theme.media.mobile} {
    flex-direction: column;
  }
`;

const BookedOptions = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  ${(props) => props.theme.media.mobile} {
    flex-direction: row-reverse;
    align-items: center;
  }
`;

const VenueBookingImage = styled.div`
  background-image: url(${(props) => props.image});
  width: 120px;
  height: 120px;
  border-radius: 5px;
  background-repeat: no-repeat, no-repeat;
  background-position: center;
  background-size: cover;
`;

const VenueInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
`;

const H2 = styled.h2`
  margin: 0px;
  font-size: 1rem;
`;

const DateBooking = styled.span`
  font-size: 0.9rem;
`;

const OpenDeleteModal = styled.div`
  cursor: pointer;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalForBookingDeletion = styled.div`
  background-color: ${(props) => props.theme.color.c5};
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  padding: 20px;
  margin: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledThemedButton = styled(ThemedButton)`
  background-color: darkred;
`;

function formatDates(dateFrom, dateTo) {
  const startDate = new Date(dateFrom);
  const endDate = new Date(dateTo);

  const formattedStartDate = `${startDate.getDate()}.${
    startDate.getMonth() + 1
  }.${startDate.getFullYear()}`;
  const formattedEndDate = `${endDate.getDate()}.${
    endDate.getMonth() + 1
  }.${endDate.getFullYear()}`;

  return `${formattedStartDate} - ${formattedEndDate}`;
}

function ProfileBookingInfo({ user }) {
  const [bookings, setBookings] = useState(user?.bookings || []);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = (bookingId) => {
    setSelectedBookingId(bookingId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedBookingId(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteBooking = async () => {
    if (selectedBookingId) {
      try {
        await deleteBooking(selectedBookingId);

        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking.id !== selectedBookingId)
        );

        closeDeleteModal();
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };

  useEffect(() => {
    if (user?.bookings) {
      setBookings(user.bookings);
    }
  }, [user]);

  return (
    <ProfileBookingContainer>
      {bookings.map((bookingData) => (
        <div key={bookingData.id}>
          <BookingCards>
            <BookedVenues id={bookingData.id}>
              <VenueBookingImage
                image={bookingData.venue.media[0]}
              ></VenueBookingImage>
              <VenueInfo>
                <H2>{bookingData.venue.name}</H2>
                <DateBooking>
                  {formatDates(bookingData.dateFrom, bookingData.dateTo)}
                </DateBooking>
              </VenueInfo>
            </BookedVenues>
            <BookedOptions>
              <OpenDeleteModal onClick={() => openDeleteModal(bookingData.id)}>
                <FontAwesomeIcon icon={faRemove}></FontAwesomeIcon>
              </OpenDeleteModal>
              <UpdateBookingModal
                setBookings={setBookings}
                bookingId={bookingData.id}
              />
            </BookedOptions>
          </BookingCards>
          <hr />
        </div>
      ))}
      {isDeleteModalOpen && (
        <ModalContainer>
          <ModalForBookingDeletion>
            <h3>Delete Booking</h3>
            <p>Are you sure you want to delete this booking?</p>
            <ButtonContainer>
              <StyledThemedButton onClick={handleDeleteBooking}>
                Delete Booking
              </StyledThemedButton>
              <ThemedButton onClick={closeDeleteModal}>Close</ThemedButton>
            </ButtonContainer>
          </ModalForBookingDeletion>
        </ModalContainer>
      )}
    </ProfileBookingContainer>
  );
}

export default ProfileBookingInfo;
