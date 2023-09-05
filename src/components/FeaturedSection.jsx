import React from "react";
import { styled } from "styled-components";
import featured from "../components/images/feat.jpg";

const FeaturedSectionContainer = styled.section`
  background-color: ${(props) => props.theme.color.c2};
  min-height: 100vh;
  padding: 10px;
`;

const FeatContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1440px;
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
  background-image: url(${featured});
  width: 60%;
  height: 90vh;
  background-repeat: no-repeat, no-repeat;
  background-position: right, left;
  background-size: cover;
  border-radius: 10px;
`;

const H1 = styled.h1`
  font-size: 2rem;
  margin-bottom: 0px;
`;

const H2 = styled.h2`
  font-size: 1.2rem;
  font-weight: normal;
`;

function FeaturedSection() {
  return (
    <FeaturedSectionContainer>
      <FeatContent>
        <H1Container>
          <H1>Villas, Apartments, Cabins</H1>
          <H2>Turning Spaces into Holidaze</H2>
        </H1Container>
        <ImageContainer></ImageContainer>
      </FeatContent>
    </FeaturedSectionContainer>
  );
}

export default FeaturedSection;
