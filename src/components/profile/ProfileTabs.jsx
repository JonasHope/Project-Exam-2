import React, { useState } from "react";
import styled, { StyleSheetManager } from "styled-components";
import ProfileBookingInfo from "./ProfileBookingInformation";
import ProfileVenues from "./ProfileVenues";

const Tab = styled.button`
  font-size: 20px;
  padding: 10px 30px;
  cursor: pointer;
  background-color: ${(props) => props.theme.color.c2}
  border: 0;
  border-radius: 5px 5px 0px 0px;
  outline: 0;
  

  ${({ active }) =>
    active &&
    `
    background-color: white;
    
    `}
`;

const ButtonGroup = styled.div`
  background-color: ${(props) => props.theme.color.c2};
`;

const types = ["Bookings", "Venues"];

function ProfileTabGroup({ user }) {
  const [active, setActive] = useState(types[0]);

  let content;
  switch (active) {
    case "Bookings":
      content = <ProfileBookingInfo user={user} />;
      break;
    case "Venues":
      content = <ProfileVenues user={user} />;
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
