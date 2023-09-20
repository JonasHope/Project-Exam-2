import React, { useState, useEffect } from "react";
import { StyleSheetManager } from "styled-components";
import styled from "styled-components";
import Width from "../styles/Width";
import ProfileAccountInfo from "../components/profile/ProfileAccountinInformation";
import ProfileBookingInfo from "../components/profile/ProfileBookingInformation";
import { fetchProfile } from "../API/apiUsers";

const ProfileContainer = styled.div`
  padding: 10px;
`;

const BookingAndVenueContainer = styled.div`
  background-color: ${(props) => props.theme.color.c5};
  border-radius: 5px;
`;

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await fetchProfile();

        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUser();
  }, []);

  return (
    <StyleSheetManager shouldForwardProp={(prop) => !["image"].includes(prop)}>
      <ProfileContainer>
        <Width>
          <ProfileAccountInfo user={user} />
          <BookingAndVenueContainer>
            <ProfileBookingInfo user={user} />
          </BookingAndVenueContainer>
        </Width>
      </ProfileContainer>
    </StyleSheetManager>
  );
}

export default ProfilePage;
