import React, { useEffect, useState } from "react";
import styled, { StyleSheetManager } from "styled-components";
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
  justify-content: center;
`;

const H1 = styled.h1`
  margin: 15px 0px;
  font-size: 1.3rem;
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
  padding: 10px;
  border: 2px solid ${(props) => props.theme.color.c1};
  border-radius: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChangeAvatarButton = styled(ThemedButton)`
  font-size: 0.8rem;
  margin: 10px 0px;
  padding: 10px;
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
  padding: 10px;

  &:hover {
    background-color: ${(props) => props.theme.color.c1};
    color: ${(props) => props.theme.color.c3};
  }
`;

const ChangeAvatarSpan = styled.span`
  cursor: pointer;
`;

const NoAccess = styled.p`
  margin: 40px auto;
`;

const MissingAvatar = styled.div`
  color: darkred;
  width: 100px;
  font-size: 0.8rem;
  margin: 10px 5px;
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
    <StyleSheetManager
      shouldForwardProp={(prop) => !["visible"].includes(prop)}
    >
      {user ? (
        <ProfileInfoContainer>
          <ProfileImageContainer>
            {profileImage ? (
              <ProfileImage
                image={profileImage}
                alt={user?.name}
              ></ProfileImage>
            ) : (
              <MissingAvatar>
                Seems like you haven't added an avatar yet.
              </MissingAvatar>
            )}

            <ChangeAvatarSpan onClick={openAvatarModal}>
              Change Avatar?
            </ChangeAvatarSpan>
          </ProfileImageContainer>
          <ProfileInfo>
            <H1>{user.name}</H1>
            <VM>{user.venueManager && <span>Venue Manager</span>}</VM>
          </ProfileInfo>
        </ProfileInfoContainer>
      ) : (
        <NoAccess>
          heyheyhey, your not supposed to be here, login first!
        </NoAccess>
      )}
      <ModalBackdrop visible={isModalOpen}>
        <ModalContent>
          <ChangeAvatarInput
            type="text"
            name="media"
            value={newAvatar}
            onChange={(e) => setNewAvatar(e.target.value)}
            placeholder="Enter new Image URL"
          ></ChangeAvatarInput>
          <ButtonGroup>
            <ChangeAvatarButton type="button" onClick={handleAvatarUpdate}>
              Change Avatar
            </ChangeAvatarButton>
            <CloseButton onClick={closeAvatarModal}>Close</CloseButton>
          </ButtonGroup>
        </ModalContent>
      </ModalBackdrop>
    </StyleSheetManager>
  );
}

export default ProfileAccountInfo;
