import React from "react";
import { styled } from "styled-components";
import featured from "../components/images/ex3.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const HomeContent = styled.main``;

const FeaturedSection = styled.section`
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

const H1 = styled.h1`
  margin-bottom: 0px;
`;

const H1P = styled.p`
  margin-top: 5px;
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
`;

const ImgFeat = styled.img`
  height: 100%;
  width: 100%;
`;

const Search = styled.div`
  background-color: ${(props) => props.theme.color.c5};
  padding: 10px 20px;
  width: 50vw;
  border-radius: 0px 20px 0px 0px;
  position: fixed;
  bottom: 0;
  left: 0;
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SearchFormChildren = styled.div`
  padding: 5px 20px;
`;

const H3 = styled.h3`
  margin: 0px 0px 5px 0px;
`;

const ButtonSearch = styled.button`
  border: none;
  background-color: ${(props) => props.theme.color.c3};
  color: ${(props) => props.theme.color.c5};
  padding: 20px;
  border-radius: 5px;
  margin-left: 15px;
`;

const SelectGuests = styled.select`
  border: none;
  font-size: 16px;
  margin-right: 5px;
`;

const GuestOption = styled.option`
  font-size: 16px;
  padding: 20px;
`;

const Vl = styled.div`
  border-left: 2px solid ${(props) => props.theme.color.c4};
  height: 70px;
  border-radius: 20px;
  margin: 0px 10px;
`;

function Home() {
  return (
    <HomeContent>
      <FeaturedSection>
        <FeatContent>
          <H1Container>
            <H1>Villas, Apartments, Cabins</H1>
            <H1P>Turning Spaces into Holidaze</H1P>
          </H1Container>
          <ImageContainer>
            <ImgFeat src={featured} alt="featured image of building"></ImgFeat>
          </ImageContainer>
        </FeatContent>
      </FeaturedSection>
      <Search>
        <SearchForm>
          <SearchFormChildren>
            <H3>Location</H3>
            <span>Where are you going? </span>
            <FontAwesomeIcon icon={faHotel} style={{ color: "#ff7e5f" }} />
          </SearchFormChildren>
          <Vl></Vl>
          <SearchFormChildren>
            <H3>Date</H3>
            <span>Check in -Check out </span>
            <input type="date"></input>
            <FontAwesomeIcon icon={faCalendar} style={{ color: "#ff7e5f" }} />
          </SearchFormChildren>
          <Vl></Vl>
          <SearchFormChildren>
            <H3>Guests</H3>
            <SelectGuests id="guests" name="guests">
              <GuestOption value="1">1 Guests</GuestOption>
              <GuestOption value="1">2 Guests</GuestOption>
              <GuestOption value="1">3 Guests</GuestOption>
              <GuestOption value="1">4 Guests</GuestOption>
            </SelectGuests>
            <FontAwesomeIcon icon={faUser} style={{ color: "#ff7e5f" }} />
          </SearchFormChildren>
          <ButtonSearch type="submit">Search Venues</ButtonSearch>
        </SearchForm>
      </Search>
    </HomeContent>
  );
}

export default Home;
