import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Width from "../styles/Width";
import { fetchProfile } from "../API/apiUsers";

const ProfileContainer = styled.div`
  padding: 10px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
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
    <ProfileContainer>
      <Width>
        {user ? (
          <>
            <ProfileInfo>
              <h1>{user.name}</h1>
              <span>{user.email}</span>
              <span>{user.venueManager && <span>Venue Manager</span>}</span>
            </ProfileInfo>
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </Width>
    </ProfileContainer>
  );
}

export default ProfilePage;
