import React, { useState } from "react";
import styled from "styled-components";

const CreateImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.c5};
  align-items: center;
  padding: 20px 10px;
  border-radius: 10px;
  gap: 20px;
`;

const ImageInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
`;

const ImageInput = styled.input`
  flex: 1;
  border: none;
  padding: 10px;
  background-color: ${(props) => props.theme.color.c2};
  border-radius: 5px;
  font-size: 16px;
  color: ${(props) => props.theme.color.c4};
  transition: border-color 0.3s ease-in-out;
  outline: none;

  &::placeholder {
    color: ${(props) => props.theme.color.c4};
  }

  &:focus {
    border-color: ${(props) => props.theme.color.c1};
  }
`;

const AddImageButton = styled.div`
  background-color: ${(props) => props.theme.color.c1};
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
`;

const LabelPlacement = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PreviewOfMedia = styled.img`
  max-width: 100px;
  max-height: 100px;
  margin: 10px;
`;

const H2 = styled.h2`
  color: ${(props) => props.theme.color.c6};
`;

const PreviewContainer = styled.div`
  display: flex;
`;

const RemoveImageIcon = styled.div`
  margin: 10px 0px;
`;

function CreateImages({ data, onUpdate }) {
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setImageUrl(value);
  };

  const addImage = () => {
    const updatedMedia = [...data.media, imageUrl];
    onUpdate("media", updatedMedia);
    setImageUrl("");
    setImagePreviews([...imagePreviews, imageUrl]);
  };

  const removeImage = (index) => {
    const updatedMedia = [...data.media];
    updatedMedia.splice(index, 1);
    onUpdate("media", updatedMedia);

    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);
  };

  return (
    <CreateImageContainer>
      <H2>Add images</H2>
      <ImageInputContainer>
        <LabelPlacement>
          <Label htmlFor="media">Image URL</Label>
          <ImageInput
            type="text"
            name="media"
            id="media"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={handleInputChange}
          />
        </LabelPlacement>
        <AddImageButton onClick={addImage}>Add Image</AddImageButton>
      </ImageInputContainer>
      <div>
        {imagePreviews.map((previewUrl, index) => (
          <PreviewContainer key={index}>
            <PreviewOfMedia src={previewUrl} alt={`Preview ${index + 1}`} />
            <RemoveImageIcon onClick={() => removeImage(index)}>
              X
            </RemoveImageIcon>
          </PreviewContainer>
        ))}
      </div>
    </CreateImageContainer>
  );
}

export default CreateImages;
