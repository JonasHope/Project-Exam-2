import React from "react";
import styled from "styled-components";
import ThemedButton from "../../styles/Button";

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
`;

const Location = styled.span``;

function ProfileVenues({ user }) {
  console.log(user);

  return (
    <>
      <ProfileVenuesContainer>
        <>
          {user.venues.map((profileVenueData) => (
            <ProfileVenue key={profileVenueData.id}>
              <div>
                <H2>{profileVenueData.name}</H2>
                <Location>{profileVenueData.location.city}</Location>
              </div>
              <ThemedButton>Update Venue</ThemedButton>
            </ProfileVenue>
          ))}
          <hr />
        </>
      </ProfileVenuesContainer>
    </>
  );
}

export default ProfileVenues;
