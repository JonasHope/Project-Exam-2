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
  min-height: 100vh;
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

const ChangeTab = styled.div`
  margin: 0px 70px;
  font-weight: bold;
  padding: 5px;
  border-bottom: 2px solid black;

  &[disabled] {
    color: ${(props) => props.theme.color.c4};
    cursor: not-allowed;
    border-bottom: 2px solid grey;
  }
`;

const SuccessMsg = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  background-color: green;
  color: ${(props) => props.theme.color.c5};
`;

const FailMsg = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  color: red;
  flex-direction: column;
  align-items: center;
`;

const types = ["Basic", "Metas", "Location", "Images"];

function CreateVenue() {
  const [active, setActive] = useState(types[0]);
  const [venueCreatedSuccess, setVenueCreatedSuccess] = useState("");
  const [venueId, setVenueId] = useState("");
  const [failResponse, setFailResponse] = useState("");
  const [formData, setFormData] = useState({
    basic: {
      name: "",
      maxGuests: "",
      price: "",
      description: "",
    },
    metas: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    media: [],
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
      lat: "",
      lng: "",
    },
  });

  async function createVenue() {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const apiUrl = "https://api.noroff.dev/api/v1/holidaze/venues";

      const formattedData = {
        name: formData.basic.name,
        description: formData.basic.description,
        media: formData.media,
        price: parseFloat(formData.basic.price),
        maxGuests: parseInt(formData.basic.maxGuests),
        rating: 5,
        meta: {
          wifi: formData.metas.wifi,
          parking: formData.metas.parking,
          breakfast: formData.metas.breakfast,
          pets: formData.metas.pets,
        },
        location: {
          address: formData.location.address,
          city: formData.location.city,
          zip: formData.location.zip,
          country: formData.location.country,
          continent: formData.location.continent,
          lat: parseFloat(formData.location.lat),
          lng: parseFloat(formData.location.lng),
        },
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        const responseData = await response.json();
        const venueId = responseData.id;
        setVenueCreatedSuccess(
          "Your Venue was successfully created! Click here to view the Venue"
        );
        setVenueId(venueId);
      } else {
        const failedResponse = await response.json();
        const failMessages = failedResponse.errors.map((error, index) => (
          <div key={index}>{error.message}</div>
        ));
        setFailResponse(failMessages);
      }
    } catch (error) {
      console.log(error, "error");
    }
  }

  const updateFormData = (section, data) => {
    setFormData({ ...formData, [section]: data });
  };

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
          <BasicInformation data={formData.basic} onUpdate={updateFormData} />
          <ButtonGroup>
            <ChangeTab
              onClick={handleBack}
              disabled={types.indexOf(active) === 0}
            >
              Back
            </ChangeTab>
            <ChangeTab
              onClick={handleNext}
              disabled={types.indexOf(active) === types.length - 1}
            >
              Next
            </ChangeTab>
          </ButtonGroup>
        </>
      );
      break;
    case "Metas":
      content = (
        <>
          <CreateMetas data={formData.metas} onUpdate={updateFormData} />
          <ButtonGroup>
            <ChangeTab
              onClick={handleBack}
              disabled={types.indexOf(active) === 0}
            >
              Back
            </ChangeTab>
            <ChangeTab
              onClick={handleNext}
              disabled={types.indexOf(active) === types.length - 1}
            >
              Next
            </ChangeTab>
          </ButtonGroup>
        </>
      );
      break;
    case "Location":
      content = (
        <>
          <CreateLocation data={formData.location} onUpdate={updateFormData} />
          <ButtonGroup>
            <ChangeTab
              onClick={handleBack}
              disabled={types.indexOf(active) === 0}
            >
              Back
            </ChangeTab>
            <ChangeTab
              onClick={handleNext}
              disabled={types.indexOf(active) === types.length - 1}
            >
              Next
            </ChangeTab>
          </ButtonGroup>
        </>
      );
      break;
    case "Images":
      content = (
        <>
          <CreateImages data={formData} onUpdate={updateFormData} />
          <ButtonGroup>
            <ChangeTab
              onClick={handleBack}
              disabled={types.indexOf(active) === 0}
            >
              Back
            </ChangeTab>
            <ChangeTab
              onClick={handleNext}
              disabled={types.indexOf(active) === types.length - 1}
            >
              Next
            </ChangeTab>
          </ButtonGroup>
        </>
      );
      break;
    default:
      content = null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createVenue();
  };

  return (
    <StyleSheetManager shouldForwardProp={(prop) => !["active"].includes(prop)}>
      <CreateVenueContainer>
        <Width>
          <div>
            <h1>Set up your venue</h1>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              {content}
              {venueCreatedSuccess ? (
                <a href={`/Venue/${venueId}`}>
                  <SuccessMsg>{venueCreatedSuccess}</SuccessMsg>
                </a>
              ) : (
                <div>
                  <FailMsg>{failResponse}</FailMsg>
                </div>
              )}
              <ButtonGroup>
                <StyledThemedButton
                  type="submit"
                  disabled={[0, 1, 2].includes(types.indexOf(active))}
                >
                  Submit
                </StyledThemedButton>
              </ButtonGroup>
            </form>
          </div>
        </Width>
      </CreateVenueContainer>
    </StyleSheetManager>
  );
}

export default CreateVenue;
