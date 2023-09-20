import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchProfile } from "../../API/apiUsers";
import { updateAvatar } from "../../API/apiChangeAvatar";

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
  margin-left: 10px;
`;

const H1 = styled.h1`
  margin: 15px 0px;
  font-size: 1.3rem;
`;

const EmailProfile = styled.span`
  font-size: 0.9rem;
  color: ${(props) => props.theme.color.c4};
`;

const VM = styled.span`
  color: ${(props) => props.theme.color.c6};
  font-size: 0.9rem;
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

function ProfileAccountInfo({ user }) {
  const [profileImage, setProfileImage] = useState(null);
  const [newAvatar, setNewAvatar] = useState("");

  useEffect(() => {
    setProfileImage(user?.avatar);
  }, [user?.avatar]);

  const handleAvatarUpdate = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found in local storage.");
      }

      await updateAvatar(accessToken, newAvatar);

      const updatedUserData = await fetchProfile();
      setProfileImage(updatedUserData?.avatar);
    } catch (error) {
      console.error("Error updating avatar", error);
    }
  };

  return (
    <div>
      {user ? (
        <ProfileInfoContainer>
          <ProfileImageContainer>
            <ProfileImage image={profileImage} alt={user?.name}></ProfileImage>
            <ChangeAvatarForm>
              <ChangeAvatarInput
                type="text"
                value={newAvatar}
                onChange={(e) => setNewAvatar(e.target.value)}
                placeholder="Image URL"
              ></ChangeAvatarInput>
              <ChangeAvatarButton type="button" onClick={handleAvatarUpdate}>
                Change Avatar
              </ChangeAvatarButton>
            </ChangeAvatarForm>
          </ProfileImageContainer>
          <ProfileInfo>
            <H1>{user.name}</H1>
            <EmailProfile>{user.email}</EmailProfile>
            <VM>{user.venueManager && <span>Venue Manager</span>}</VM>
          </ProfileInfo>
        </ProfileInfoContainer>
      ) : (
        <p>(Remember to add loader here)</p>
      )}
    </div>
  );
}

export default ProfileAccountInfo;
