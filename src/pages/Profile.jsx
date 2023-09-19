import React, { useEffect, useState } from "react";
import { StyleSheetManager } from "styled-components";
import styled from "styled-components";
import Width from "../styles/Width";
import { fetchProfile } from "../API/apiUsers";

const ProfileContainer = styled.div`
  padding: 10px;
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  align-items: flex-top;
  margin: 20px 0px;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px 0px 10px;
`;

const H1 = styled.h1`
  margin: 5px 0px;
  font-size: 1.3rem;
`;

const EmailProfile = styled.span`
  font-size: 0.9rem;
  color: ${(props) => props.theme.color.c4};
`;

const VM = styled.span`
  color: ${(props) => props.theme.color.c6};
`;

const ProfileImage = styled.div`
  background-image: url(${(props) => props.image});
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-repeat: no-repeat, no-repeat;
  background-position: center;
  background-size: cover;
`;

const ChangeAvatarForm = styled.form`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
`;

const ChangeAvatarInput = styled.input`
  max-width: 120px;
  padding: 5px;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.color.c6};
  background-color: inherit;
`;

const ChangeAvatarButton = styled.button`
  margin-top: 5px;
  border: none;
  border-radius: 2px;
  padding: 5px 10px;
  background-color: ${(props) => props.theme.color.c3};
  color: ${(props) => props.theme.color.c5};
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
    setProfileImage(user?.avatar);
  }, [user?.avatar]);

  return (
    <StyleSheetManager shouldForwardProp={(prop) => !["image"].includes(prop)}>
      <ProfileContainer>
        <Width>
          {user ? (
            <ProfileInfoContainer>
              <ProfileImageContainer>
                <ProfileImage image={profileImage}></ProfileImage>
                <ChangeAvatarForm>
                  <ChangeAvatarInput
                    type="text"
                    placeholder="Image URL"
                  ></ChangeAvatarInput>
                  <ChangeAvatarButton>Change Avatar</ChangeAvatarButton>
                </ChangeAvatarForm>
              </ProfileImageContainer>
              <ProfileInfo>
                <H1>{user.name}</H1>
                <EmailProfile>{user.email}</EmailProfile>
                <VM>{user.venueManager && <span>Venue Manager</span>}</VM>
              </ProfileInfo>
            </ProfileInfoContainer>
          ) : (
            <p>(temp, Remember to add loader here)</p>
          )}
        </Width>
      </ProfileContainer>
    </StyleSheetManager>
  );
}

export default ProfilePage;
