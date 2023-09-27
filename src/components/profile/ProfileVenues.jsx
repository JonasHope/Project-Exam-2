import React, { useState, useEffect } from "react";
import styled, { StyleSheetManager } from "styled-components";
import ThemedButton from "../../styles/Button";
import { deleteVenue } from "../../API/apiDeleteVenue";
import { fetchVenueBookings } from "../../API/apiUsers";

const ProfileVenuesContainer = styled.div`
  min-height: 100vh;
  margin: 10px;
  border-radius: 10px;
`;

const ProfileVenue = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${(props) => props.theme.media.mobile} {
    flex-direction: column;
  }
`;

const H2 = styled.h2`
  margin: 0px;
  font-size: 1rem;
`;

const Location = styled.span`
  font-size: 0.8rem;
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

const StyledThemedButton = styled(ThemedButton)`
  background-color: darkred;
`;

function ProfileVenues({ user }) {
  const [venueToDelete, setVenueToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [venues, setVenues] = useState(user.venues);

  useEffect(() => {
    setVenues(user.venues);
    fetchVenueBookings()
      .then((response) => {
        console.log("Booking response:", response);
      })
      .catch((error) => {
        console.error("Failed to fetch venue bookings:", error);
      });
  }, [user.venues]);

  const handleDeleteClick = (venueId) => {
    setVenueToDelete(venueId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteVenue(venueToDelete);
      setShowDeleteModal(false);
      setVenues((prevVenues) =>
        prevVenues.filter((venue) => venue.id !== venueToDelete)
      );
    } catch (error) {
      console.error("Failed to delete venue:", error);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setVenueToDelete(null);
  };

  return (
    <StyleSheetManager
      shouldForwardProp={(prop) => !["visible"].includes(prop)}
    >
      <ProfileVenuesContainer>
        {venues.map((profileVenueData) => (
          <div key={profileVenueData.id}>
            <ProfileVenue>
              <div>
                <H2>{profileVenueData.name}</H2>
                <Location>{profileVenueData.location.city}</Location>
              </div>
              <StyledThemedButton
                onClick={() => handleDeleteClick(profileVenueData.id)}
              >
                Delete Venue
              </StyledThemedButton>
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
