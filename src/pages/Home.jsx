import React from "react";
import { styled } from "styled-components";
import FeaturedSection from "../components/FeaturedSection";
import SearchComponent from "../components/SearchComponent";
import HomeVM from "../components/HomeVMSection";
import { useNavigate } from "react-router-dom";

const HomeContent = styled.main``;

function Home() {
  const navigate = useNavigate();

  const handleSearch = (country, guests) => {
    navigate(`/Venues?country=${country}&maxGuests=${guests}`);
  };

  return (
    <HomeContent>
      <FeaturedSection />
      <SearchComponent onSearch={handleSearch} />
      <HomeVM />
    </HomeContent>
  );
}

export default Home;
