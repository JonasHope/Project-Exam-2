import React from "react";
import { styled } from "styled-components";
import featured from "../components/images/ex3.jpg";

const FeaturedSectionContainer = styled.section`
  background-color: ${(props) => props.theme.color.c1};
  height: 100vh;
`;

const FeatContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: auto;
`;

const H1Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-height: 50vh;
  justify-content: center;
`;

const ImageContainer = styled.div`
  width: 50%;
  overflow: hidden;
  height: 100vh;
`;

const ImgFeat = styled.img`
  height: 100%;
  width: 100%;
`;

function FeaturedSection() {
  return (
    <FeaturedSectionContainer>
      <FeatContent>
        <H1Container>
          <h1>Villas, Apartments, Cabins</h1>
          <p>Turning Spaces into Holidaze</p>
        </H1Container>
        <ImageContainer>
          <ImgFeat src={featured} alt="featured image of building" />
        </ImageContainer>
      </FeatContent>
    </FeaturedSectionContainer>
  );
}

export default FeaturedSection;
