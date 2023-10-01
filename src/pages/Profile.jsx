import React, { useState, useEffect } from "react";
import { StyleSheetManager } from "styled-components";
import styled from "styled-components";
import Width from "../styles/Width";
import ProfileAccountInfo from "../components/profile/ProfileAccountinInformation";
import { fetchProfile } from "../API/user/apiUsers";
import ProfileTabGroup from "../components/profile/ProfileTabs";
import ThemedButton from "../styles/Button";
import { Link } from "react-router-dom";
import CustomLoader from "../components/loader/loader";

const ProfileContainer = styled.div`
  background-color: ${(props) => props.theme.color.c2};
`;

const BookingAndVenueContainer = styled.div`
  background-color: ${(props) => props.theme.color.c5};
  border-radius: 5px;
`;

const AccountInfoAndOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  ${(props) => props.theme.media.tablet} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StyledThemedButton = styled(ThemedButton)`
  background-color: green;
  color: ${(props) => props.theme.color.c5};
  margin: 0px 10px;

  ${(props) => props.theme.media.tablet} {
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 5px 10px;
    width: 130px;
    font-size: 0.8rem;
  }
`;

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await fetchProfile();

        setUser(userData);
        setLoader(false);
      } catch (error) {}
    }

    fetchUser();
  }, []);

  return (
    <StyleSheetManager shouldForwardProp={(prop) => !["image"].includes(prop)}>
      <ProfileContainer>
        <Width>
          {loader ? (
            <CustomLoader />
          ) : (
            <>
              <AccountInfoAndOptions>
                <ProfileAccountInfo user={user} />
                {user && user.venueManager ? (
                  <Link to="/CreateVenue">
                    <StyledThemedButton>Create Venue</StyledThemedButton>
                  </Link>
                ) : (
                  <p></p>
                )}
              </AccountInfoAndOptions>

              <BookingAndVenueContainer>
                <ProfileTabGroup user={user} />
              </BookingAndVenueContainer>
            </>
          )}
        </Width>
      </ProfileContainer>
    </StyleSheetManager>
  );
}

export default ProfilePage;
