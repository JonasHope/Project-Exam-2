import React from "react";
import { styled } from "styled-components";
import FeaturedSection from "../components/FeaturedSection";
import SearchComponent from "../components/search/SearchComponent";
import HomeVM from "../components/HomeVMSection";

const HomeContent = styled.main``;

function Home() {
  return (
    <HomeContent>
      <FeaturedSection />
      <SearchComponent />
      <HomeVM />
    </HomeContent>
  );
}

export default Home;
