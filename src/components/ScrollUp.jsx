import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import styled, { StyleSheetManager } from "styled-components";

const ScrollToTopButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  display: ${(props) => (props.visible ? "block" : "none")};
  background-color: ${(props) => props.theme.color.c6};
  color: ${(props) => props.theme.color.c5};
  padding: 10px;
  border-radius: 50%;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.color.c7};
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  display: flex;
`;

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StyleSheetManager
      shouldForwardProp={(prop) => !["image", "visible"].includes(prop)}
    >
      <ScrollToTopButton visible={isVisible} onClick={scrollToTop}>
        <StyledFontAwesomeIcon icon={faChevronUp} />
      </ScrollToTopButton>
    </StyleSheetManager>
  );
}

export default ScrollToTop;
