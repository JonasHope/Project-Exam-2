import React from "react";
import styled from "styled-components";
import Width from "../styles/Width";

const ProfileContainer = styled.div`
  padding: 10px;
`;

function ProfilePage() {
  return (
    <ProfileContainer>
      <Width>
        <h1>Name</h1>
      </Width>
    </ProfileContainer>
  );
}

export default ProfilePage;
