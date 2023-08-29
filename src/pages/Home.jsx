import React from "react";
import { styled } from "styled-components";
import FeaturedSection from "../components/FeaturedSection";
import SearchComponent from "../components/SearchComponent";

const HomeContent = styled.main``;

function Home() {
  return (
    <HomeContent>
      <FeaturedSection />
      <SearchComponent />
    </HomeContent>
  );
}

export default Home;
