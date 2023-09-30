import React, { useState } from "react";
import styled from "styled-components";
import Width from "../../styles/Width";
import ThemedButton from "../../styles/Button";

const UpdateVenueContainer = styled.div``;

const FormModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const FormforVenueUpdate = styled.form`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.color.c2};
  padding: 20px 30px;
  border-radius: 10px;
  max-height: 50vh;
  overflow-x: hidden;
`;

const SuccessContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: darkgreen;
  padding: 10px;
  z-index: 1005;
  max-width: 200px;
`;

const OpenUpdateFormButton = styled(ThemedButton)`
  padding: 5px 10px;
  background-color: inherit;
  color: ${(props) => props.theme.color.c3};
  font-weight: bold;

  &:hover {
    background-color: ${(props) => props.theme.color.c2};
  }
`;

const H1 = styled.h1`
  text-align: center;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 10px;
`;

const Input = styled.input`
  border-radius: 20px;
  border: none;
  padding: 10px 20px;
  box-shadow: 0px 1px 2px black;
  margin: 5px;
`;

const Textarea = styled.textarea`
  border-radius: 20px;
  border: none;
  padding: 10px 20px;
  box-shadow: 0px 1px 2px black;
  resize: none;
  margin: 5px;
`;

const CheckBox = styled.input`
  margin: 5px;
`;

const Label = styled.label``;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

function UpdateVenue({ bookingData, onUpdateVenue }) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [updateSuccessMessage, setUpdateSuccessMessage] = useState(null);
  const [editedFields, setEditedFields] = useState({});
  const [venueData, setVenueData] = useState({
    name: "",
    price: 0,
    maxGuests: 0,
    rating: 5,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
      lat: 0,
      lng: 0,
    },
  });

  const handleUpdateClick = () => {
    setIsFormVisible(!isFormVisible);
    setEditedFields({});
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setEditedFields((prevEditedFields) => ({
      ...prevEditedFields,
      [name]: true,
    }));

    const parsedValue =
      type === "checkbox"
        ? checked
        : type === "number"
        ? parseFloat(value)
        : value;

    if (
      name === "wifi" ||
      name === "parking" ||
      name === "breakfast" ||
      name === "pets"
    ) {
      setVenueData((prevVenueData) => ({
        ...prevVenueData,
        meta: {
          ...prevVenueData.meta,
          [name]: parsedValue,
        },
      }));

      setEditedFields((prevEditedFields) => ({
        ...prevEditedFields,
        [`meta.${name}`]: true,
      }));
    } else {
      setVenueData((prevVenueData) => ({
        ...prevVenueData,
        [name]: parsedValue,
      }));

      setEditedFields((prevEditedFields) => ({
        ...prevEditedFields,
        [name]: true,
      }));
    }
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;

    setVenueData((prevVenueData) => ({
      ...prevVenueData,
      location: {
        ...prevVenueData.location,
        [name]: value,
      },
    }));

    setEditedFields((prevEditedFields) => ({
      ...prevEditedFields,
      [`location.${name}`]: true,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const apiUrl = `https://api.noroff.dev/api/v1/holidaze/venues/${bookingData.id}`;

      const editedFieldsPayload = {};
      for (const field in editedFields) {
        if (field.startsWith("location.")) {
          const locationField = field.replace("location.", "");
          editedFieldsPayload["location"] = {
            ...editedFieldsPayload["location"],
            [locationField]:
              locationField === "lat" || locationField === "lng"
                ? parseFloat(venueData.location[locationField])
                : venueData.location[locationField],
          };
        } else if (field.startsWith("meta.")) {
          const metaField = field.replace("meta.", "");
          editedFieldsPayload["meta"] = {
            ...editedFieldsPayload["meta"],
            [metaField]: venueData.meta[metaField],
          };
        } else {
          editedFieldsPayload[field] = venueData[field];
        }
      }

      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(editedFieldsPayload),
      });

      if (response.ok) {
        onUpdateVenue(editedFieldsPayload);

        function countdownAndReload(countdown) {
          if (countdown === 0) {
            window.location.reload();
          } else {
            setUpdateSuccessMessage(
              `Your venue is updated, returning to the profile page in ${countdown} seconds`
            );
            setTimeout(function () {
              countdownAndReload(countdown - 1);
            }, 1000);
          }
        }
        countdownAndReload(7);
      } else {
        console.error("Failed to update venue");
      }
    } catch (error) {
      console.error("Error updating venue:", error);
    }
  };

  return (
    <Width>
      <UpdateVenueContainer>
        <OpenUpdateFormButton onClick={handleUpdateClick}>
          {isFormVisible ? "Hide Update Form" : "Update Venue"}
        </OpenUpdateFormButton>

        {isFormVisible && (
          <FormModalBackground>
            <FormforVenueUpdate onSubmit={handleFormSubmit}>
              <CloseButton onClick={handleUpdateClick}>×</CloseButton>
              <H1>Update form</H1>
              <FormSection>
                <Label htmlFor="name">Name of venue</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name of venue"
                  onChange={handleInputChange}
                ></Input>
                <Label htmlFor="price">Price of venue</Label>
                <Input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Price of venue"
                  onChange={handleInputChange}
                ></Input>
                <Label htmlFor="maxGuests">Max guests</Label>
                <Input
                  type="number"
                  name="maxGuests"
                  id="maxGuests"
                  placeholder="Max guests"
                  onChange={handleInputChange}
                ></Input>
                <Label htmlFor="description">Venue description</Label>
                <Textarea
                  name="description"
                  id="description"
                  placeholder="Venue description"
                  rows="5"
                  onChange={handleInputChange}
                ></Textarea>
              </FormSection>
              <FormSection>
                <Label htmlFor="address">Address</Label>
                <Input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Address"
                  onChange={handleLocationChange}
                ></Input>
                <Label htmlFor="city">City</Label>
                <Input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="City"
                  onChange={handleLocationChange}
                ></Input>
                <Label htmlFor="zip">Zip code</Label>
                <Input
                  type="text"
                  name="zip"
                  id="zip"
                  placeholder="Zip code"
                  onChange={handleLocationChange}
                ></Input>
                <Label htmlFor="country">Country</Label>
                <Input
                  type="text"
                  name="country"
                  id="country"
                  placeholder="Country"
                  onChange={handleLocationChange}
                ></Input>
                <Label htmlFor="continent">Continent</Label>
                <Input
                  type="text"
                  name="continent"
                  id="continent"
                  placeholder="Continent"
                  onChange={handleLocationChange}
                ></Input>
                <Label htmlFor="lat">Latitude</Label>
                <Input
                  type="number"
                  name="lat"
                  id="lat"
                  placeholder="Latitude"
                  onChange={handleLocationChange}
                ></Input>
                <Label htmlFor="lng">Longitude</Label>
                <Input
                  type="number"
                  name="lng"
                  id="lng"
                  placeholder="Longitude"
                  onChange={handleLocationChange}
                ></Input>
              </FormSection>
              <FormSection>
                <div>
                  <CheckBox
                    type="checkbox"
                    name="wifi"
                    id="wifi"
                    checked={venueData.meta.wifi}
                    onChange={handleInputChange}
                  ></CheckBox>
                  <Label htmlFor="wifi">WiFi</Label>
                </div>
                <div>
                  <CheckBox
                    type="checkbox"
                    name="parking"
                    id="parking"
                    checked={venueData.meta.parking}
                    onChange={handleInputChange}
                  ></CheckBox>
                  <Label htmlFor="parking">Parking</Label>
                </div>
                <div>
                  <CheckBox
                    type="checkbox"
                    name="breakfast"
                    id="breakfast"
                    checked={venueData.meta.breakfast}
                    onChange={handleInputChange}
                  ></CheckBox>
                  <Label htmlFor="breakfast">Breakfast included</Label>
                </div>
                <div>
                  <CheckBox
                    type="checkbox"
                    name="pets"
                    id="pets"
                    checked={venueData.meta.pets}
                    onChange={handleInputChange}
                  ></CheckBox>
                  <Label htmlFor="pets">Pets allowed</Label>
                </div>
              </FormSection>
              <SuccessContainer>{updateSuccessMessage}</SuccessContainer>
              <ThemedButton type="submit">Submit</ThemedButton>
            </FormforVenueUpdate>
          </FormModalBackground>
        )}
      </UpdateVenueContainer>
    </Width>
  );
}

export default UpdateVenue;
