import React, { useState } from "react";
import styled, { StyleSheetManager } from "styled-components";
import ProfileBookingInfo from "./ProfileBookingInformation";

const Tab = styled.button`
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;

  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid black;
    opacity:1;
    `}
`;

const ButtonGroup = styled.div`
  display: flex;
`;

const types = ["Bookings", "Venues"];

function ProfileTabGroup({ user }) {
  const [active, setActive] = useState(types[0]);

  let content;
  switch (active) {
    case "Bookings":
      content = <ProfileBookingInfo user={user} />;
      break;
    default:
      content = null;
  }
  return (
    <>
      <StyleSheetManager
        shouldForwardProp={(prop) => !["active"].includes(prop)}
      >
        <ButtonGroup>
          {types.map((type) => (
            <Tab
              key={type}
              active={active === type}
              onClick={() => setActive(type)}
            >
              {type}
            </Tab>
          ))}
        </ButtonGroup>
        {content}
      </StyleSheetManager>
    </>
  );
}

export default ProfileTabGroup;
