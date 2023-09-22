import React, { useState } from "react";
import Width from "../styles/Width";
import styled, { StyleSheetManager } from "styled-components";
import BasicInformation from "../components/createVenue/CreateBasicInformation";
import CreateMetas from "../components/createVenue/CreateMetas";
import CreateImages from "../components/createVenue/CreateImages";
import CreateLocation from "../components/createVenue/CreateLocation";
import ThemedButton from "../styles/Button";

const CreateVenueContainer = styled.div`
  padding: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

const StyledThemedButton = styled(ThemedButton)`
  margin: 0px 70px;

  &[disabled] {
    background-color: ${(props) => props.theme.color.c4};
    cursor: not-allowed;
  }
`;

const types = ["Basic", "Metas", "Images", "Location"];

function CreateVenue() {
  const [active, setActive] = useState(types[0]);

  const handleNext = () => {
    const currentIndex = types.indexOf(active);
    if (currentIndex < types.length - 1) {
      setActive(types[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const currentIndex = types.indexOf(active);
    if (currentIndex > 0) {
      setActive(types[currentIndex - 1]);
    }
  };

  let content;
  switch (active) {
    case "Basic":
      content = (
        <>
          <BasicInformation />
          <ButtonGroup>
            <StyledThemedButton
              onClick={handleBack}
              disabled={types.indexOf(active) === 0}
            >
              Back
            </StyledThemedButton>
            <StyledThemedButton
              onClick={handleNext}
              disabled={types.indexOf(active) === types.length - 1}
            >
              Next
            </StyledThemedButton>
          </ButtonGroup>
        </>
      );
      break;
    case "Metas":
      content = (
        <>
          <CreateMetas />
          <ButtonGroup>
            <StyledThemedButton
              onClick={handleBack}
              disabled={types.indexOf(active) === 0}
            >
              Back
            </StyledThemedButton>
            <StyledThemedButton
              onClick={handleNext}
              disabled={types.indexOf(active) === types.length - 1}
            >
              Next
            </StyledThemedButton>
          </ButtonGroup>
        </>
      );
      break;
    case "Images":
      content = (
        <>
          <CreateImages />
          <ButtonGroup>
            <StyledThemedButton
              onClick={handleBack}
              disabled={types.indexOf(active) === 0}
            >
              Back
            </StyledThemedButton>
            <StyledThemedButton
              onClick={handleNext}
              disabled={types.indexOf(active) === types.length - 1}
            >
              Next
            </StyledThemedButton>
          </ButtonGroup>
        </>
      );
      break;
    case "Location":
      content = (
        <>
          <CreateLocation />
          <ButtonGroup>
            <StyledThemedButton
              onClick={handleBack}
              disabled={types.indexOf(active) === 0}
            >
              Back
            </StyledThemedButton>
            <StyledThemedButton
              onClick={handleNext}
              disabled={types.indexOf(active) === types.length - 1}
            >
              Next
            </StyledThemedButton>
          </ButtonGroup>
        </>
      );
      break;
    default:
      content = null;
  }

  return (
    <StyleSheetManager shouldForwardProp={(prop) => !["active"].includes(prop)}>
      <CreateVenueContainer>
        <Width>
          <div>
            <h1>Set up your venue</h1>
          </div>
          <div>{content}</div>
        </Width>
      </CreateVenueContainer>
    </StyleSheetManager>
  );
}

export default CreateVenue;
