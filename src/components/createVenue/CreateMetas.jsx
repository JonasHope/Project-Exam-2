import React from "react";
import styled from "styled-components";

const InputsContainer = styled.div`
  background-color: ${(props) => props.theme.color.c5};
  padding: 20px 10px;
  border-radius: 10px;
  gap: 20px;
`;

const Metas = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const InputContent = styled.div`
  width: 200px;
`;

const Input = styled.input`
  margin: 12px 0px;
`;

const LabelAlign = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.color.c3};
`;

const H2Container = styled.div`
  text-align: center;
`;

const H2 = styled.h2`
  color: ${(props) => props.theme.color.c6};
`;

function CreateMetas({ data, onUpdate }) {
  const handleInputChange = (e) => {
    const { name, checked } = e.target;
    onUpdate("metas", { ...data, [name]: checked });
  };

  return (
    <InputsContainer>
      <H2Container>
        <H2>Meta Information</H2>
      </H2Container>
      <Metas>
        <InputContent>
          <LabelAlign>
            <Label htmlFor="wifi">WiFi</Label>
            <Input
              type="checkbox"
              name="wifi"
              id="wifi"
              checked={data.wifi}
              onChange={handleInputChange}
            />
          </LabelAlign>
          <LabelAlign>
            <Label htmlFor="parking">Parking</Label>
            <Input
              type="checkbox"
              name="parking"
              id="parking"
              checked={data.parking}
              onChange={handleInputChange}
            />
          </LabelAlign>
          <LabelAlign>
            <Label htmlFor="breakfast">Breakfast</Label>
            <Input
              type="checkbox"
              name="breakfast"
              id="breakfast"
              checked={data.breakfast}
              onChange={handleInputChange}
            />
          </LabelAlign>
          <LabelAlign>
            <Label htmlFor="pets">Pets</Label>
            <Input
              type="checkbox"
              name="pets"
              id="pets"
              checked={data.pets}
              onChange={handleInputChange}
            />
          </LabelAlign>
        </InputContent>
      </Metas>
    </InputsContainer>
  );
}

export default CreateMetas;
