import React from "react";
import { styled } from "styled-components";
import FeaturedSection from "../components/home/FeaturedSection";
import SearchComponent from "../components/home/SearchComponent";
import HomeVM from "../components/home/HomeVMSection";
import { useNavigate } from "react-router-dom";
import { StyleSheetManager } from "styled-components";

const HomeContent = styled.main``;

function Home() {
  const navigate = useNavigate();

  const handleSearch = (country, guests) => {
    navigate(`/Venues?country=${country}&maxGuests=${guests}`);
  };

  return (
    <StyleSheetManager
      shouldForwardProp={(prop) => !["visable"].includes(prop)}
    >
      <HomeContent>
        <FeaturedSection />
        <SearchComponent onSearch={handleSearch} />
        <HomeVM />
      </HomeContent>
    </StyleSheetManager>
  );
}

export default Home;
