import React from "react";
import styled from "styled-components";

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.c5};
  align-items: center;
  padding: 20px 10px;
  border-radius: 10px;
  gap: 20px;
`;

const InputContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;
const inputStyles = `
  border: none;
  margin: 10px 0px;
  padding: 10px;
  background-color: transparent;
  border-bottom: 2px solid black;
  transition: border-color 0.3s ease-in-out;
  font-size: 16px;
  
  &:hover {
    background-color: ${(props) => props.theme.color.c2};
  }


  &:focus {
    outline: none;
    border-color: orange;
  }

  &::placeholder {
    color: grey;
  }
`;

const Input = styled.input`
  ${inputStyles}
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.color.c3};
`;

const H2 = styled.h2`
  color: ${(props) => props.theme.color.c6};
`;

function CreateLocation({ data, onUpdate }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onUpdate("location", { ...data, [name]: value });
  };

  return (
    <InputsContainer>
      <H2>Location</H2>
      <InputContent>
        <Label htmlFor="address">Address</Label>
        <Input
          type="text"
          name="address"
          id="address"
          placeholder="Street and number"
          value={data.address}
          onChange={handleInputChange}
        />
        <Label htmlFor="city">City</Label>
        <Input
          type="text"
          name="city"
          id="city"
          placeholder="City or town"
          value={data.city}
          onChange={handleInputChange}
        />
        <Label htmlFor="zip">ZIP Code</Label>
        <Input
          type="text"
          name="zip"
          id="zip"
          placeholder="ZIP Code"
          value={data.zip}
          onChange={handleInputChange}
        />
        <Label htmlFor="country">Country</Label>
        <Input
          type="text"
          name="country"
          id="country"
          placeholder="Country"
          value={data.country}
          onChange={handleInputChange}
        />
        <Label htmlFor="continent">Continent</Label>
        <Input
          type="text"
          name="continent"
          id="continent"
          placeholder="Continent"
          value={data.continent}
          onChange={handleInputChange}
        />
        <Label htmlFor="lat">Latitude</Label>
        <Input
          type="number"
          name="lat"
          id="lat"
          placeholder="Latitude"
          value={data.lat}
          onChange={handleInputChange}
        />
        <Label htmlFor="lng">Longitude</Label>
        <Input
          type="number"
          name="lng"
          id="lng"
          placeholder="Longitude"
          value={data.lng}
          onChange={handleInputChange}
        />
      </InputContent>
    </InputsContainer>
  );
}

export default CreateLocation;
