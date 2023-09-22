import React from "react";
import styled from "styled-components";

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.c5};
  align-items: center;
  padding: 20px 10px;
  border-radius: 10px;
`;

const InputContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  border: none;
  margin: 10px 0px;
  padding: 10px;
  border-bottom: 1px solid ${(props) => props.theme.color.c3};
  background-color: ${(props) => props.theme.color.c2};
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  border: none;
  margin: 10px 0px;
  padding: 10px;
  border-bottom: 1px solid ${(props) => props.theme.color.c3};
  background-color: ${(props) => props.theme.color.c2};
  border-radius: 5px;
  resize: none;
`;

function BasicInformation() {
  return (
    <InputsContainer>
      <InputContent>
        <label htmlFor="name">Venue name</label>
        <Input type="text" name="name" id="name" placeholder="Name"></Input>
        <label htmlFor="maxGuests">Set a max guest number</label>
        <Input
          type="number"
          name="maxGuests"
          id="maxGuests"
          placeholder="Max guests"
        ></Input>
        <label htmlFor="price">Set a price</label>
        <Input
          type="number"
          name="price"
          id="price"
          placeholder="Price"
        ></Input>
        <label htmlFor="description">Write a description of the venue</label>
        <Textarea
          name="description"
          id="description"
          placeholder="Description"
          rows="5"
        ></Textarea>
      </InputContent>
    </InputsContainer>
  );
}

export default BasicInformation;
