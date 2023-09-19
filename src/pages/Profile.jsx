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

const ProfileImageContainer = styled.div`
  background-image: url(${(props) => props.image});
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-repeat: no-repeat, no-repeat;
  background-position: center;
  background-size: cover;
`;

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

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

  useEffect(() => {
    if (user.avatar > 0) {
      setProfileImage(user?.avatar);
    }
  }, [user?.avatar]);

  return (
    <ProfileContainer>
      <Width>
        {user ? (
          <>
            <ProfileImageContainer image={profileImage}></ProfileImageContainer>
            <ProfileInfo>
              <h1>{user.name}</h1>
              <span>{user.email}</span>
              <span>{user.venueManager && <span>Venue Manager</span>}</span>
            </ProfileInfo>
          </>
        ) : (
          <p>(temp, Remember to add loader here)</p>
        )}
      </Width>
    </ProfileContainer>
  );
}

export default ProfilePage;
