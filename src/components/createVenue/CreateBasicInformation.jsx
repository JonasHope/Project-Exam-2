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
    color: ${(props) => props.theme.color.c4};
  }
`;

const Input = styled.input`
  ${inputStyles}
`;

const Textarea = styled.textarea`
  ${inputStyles}

  min-height: 100px;
  resize: none;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.color.c3};
`;

const H2 = styled.h2`
  color: ${(props) => props.theme.color.c6};
`;

function BasicInformation({ data, onUpdate }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onUpdate("basic", { ...data, [name]: value });
  };
  return (
    <InputsContainer>
      <H2>Basic Information</H2>
      <InputContent>
        <Label htmlFor="name">Venue name</Label>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={data.name}
          onChange={handleInputChange}
        />
        <Label htmlFor="maxGuests">Set a max guest number</Label>
        <Input
          type="number"
          name="maxGuests"
          id="maxGuests"
          placeholder="Max guests"
          value={data.maxGuests}
          onChange={handleInputChange}
        />
        <Label htmlFor="price">Set a price</Label>
        <Input
          type="number"
          name="price"
          id="price"
          placeholder="Price"
          value={data.price}
          onChange={handleInputChange}
        />
        <Label htmlFor="description">Write a description of the venue</Label>
        <Textarea
          name="description"
          id="description"
          placeholder="Description"
          rows="5"
          value={data.description}
          onChange={handleInputChange}
        />
      </InputContent>
    </InputsContainer>
  );
}

export default BasicInformation;
