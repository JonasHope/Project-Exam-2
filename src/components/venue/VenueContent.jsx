import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { StyleSheetManager } from "styled-components";

const InformationContainer = styled.div`
  width: 50%;
`;

const VenueImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HighlightedImage = styled.div`
  background-image: url(${(props) => props.image});
  width: 100%;
  height: 300px;
  background-repeat: no-repeat, no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 10px;
`;

const SmallImages = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const Image = styled.div`
  background-image: url(${(props) => props.image});
  width: 100px;
  height: 100px;
  background-repeat: no-repeat, no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 10px;
  margin: 5px;
  cursor: pointer;
  opacity: ${(props) => (props.highlighted ? 1 : 0.7)};
`;

function VenueInformation({ venueData }) {
  const [highlightedImage, setHighlightedImage] = useState(null);

  useEffect(() => {
    if (venueData?.media?.length > 0) {
      setHighlightedImage(venueData.media[0]);
    }
  }, [venueData]);

  const handleImageClick = (image) => {
    setHighlightedImage(image);
  };

  return (
    <StyleSheetManager
      shouldForwardProp={(prop) => !["image", "highlighted"].includes(prop)}
    >
      <InformationContainer>
        <VenueImagesContainer>
          <HighlightedImage image={highlightedImage}></HighlightedImage>
          <SmallImages>
            {venueData?.media?.map((image, index) => (
              <Image
                key={index}
                image={image}
                highlighted={image === highlightedImage ? "true" : undefined}
                onClick={() => handleImageClick(image)}
              ></Image>
            ))}
          </SmallImages>
        </VenueImagesContainer>
      </InformationContainer>
    </StyleSheetManager>
  );
}

export default VenueInformation;
