import React, { useState } from "react";
import styled, { StyleSheetManager } from "styled-components";
import DescriptionTab from "./DescriptionTab";
import InformationTab from "./InformationTab";
import LocationTab from "./LocationTab";

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

const types = ["Description", "Information", "Location"];

function TabGroup({ venueData }) {
  const [active, setActive] = useState(types[0]);

  let content;
  switch (active) {
    case "Description":
      content = <DescriptionTab venueData={venueData} />;
      break;
    case "Information":
      content = <InformationTab venueData={venueData} />;
      break;
    case "Location":
      content = <LocationTab venueData={venueData} />;
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

export default TabGroup;
