import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchProfile } from "../../API/apiUsers";
import { updateAvatar } from "../../API/apiChangeAvatar";
import ThemedButton from "../../styles/Button";

const ProfileInfoContainer = styled.div`
  display: flex;
  margin: 20px 0px;
  padding: 10px;

  ${(props) => props.theme.media.tablet} {
    margin: 10px 0px 5px 0px;
    padding: 0px 10px;
  }
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

const ChangeAvatarInput = styled.input`
  padding: 5px;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.color.c6};
  background-color: inherit;
`;

const ChangeAvatarButton = styled(ThemedButton)`
  font-size: 0.8rem;
  margin: 10px 0px;
`;

const ModalBackdrop = styled.div`
  display: ${(props) => (props.visible ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 200px;
`;

const CloseButton = styled(ThemedButton)`
  background-color: ${(props) => props.theme.color.c4};
  color: ${(props) => props.theme.color.c5};

  &:hover {
    background-color: ${(props) => props.theme.color.c1};
    color: ${(props) => props.theme.color.c3};
  }
`;

const ChangeAvatarSpan = styled.span`
  cursor: pointer;
`;

function ProfileAccountInfo({ user }) {
  const [profileImage, setProfileImage] = useState(null);
  const [newAvatar, setNewAvatar] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      closeAvatarModal();
    } catch (error) {
      console.error("Error updating avatar", error);
    }
  };

  const openAvatarModal = () => {
    setIsModalOpen(true);
  };

  const closeAvatarModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
  };

  return (
    <div>
      {user ? (
        <ProfileInfoContainer>
          <ProfileImageContainer>
            <ProfileImage image={profileImage} alt={user?.name}></ProfileImage>
            <ChangeAvatarSpan onClick={openAvatarModal}>
              Change Avatar?
            </ChangeAvatarSpan>
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
      <ModalBackdrop visible={isModalOpen}>
        <ModalContent>
          <ChangeAvatarInput
            type="text"
            name="media"
            value={newAvatar}
            onChange={(e) => setNewAvatar(e.target.value)}
            placeholder="Image URL"
          ></ChangeAvatarInput>
          <ChangeAvatarButton type="button" onClick={handleAvatarUpdate}>
            Change Avatar
          </ChangeAvatarButton>
          <CloseButton onClick={closeAvatarModal}>Close</CloseButton>
        </ModalContent>
      </ModalBackdrop>
    </div>
  );
}

export default ProfileAccountInfo;
