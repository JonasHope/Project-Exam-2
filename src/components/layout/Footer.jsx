import React from "react";
import { styled } from "styled-components";

const SiteFooter = styled.footer`
  background-color: ${(props) => props.theme.color.c1};
  margin-top: auto;
  text-align: center;
`;

const FooterDiv = styled.div``;

const StyledP = styled.p``;

function Footer() {
  return (
    <SiteFooter>
      <FooterDiv>
        <StyledP>Copyright 2023</StyledP>
      </FooterDiv>
    </SiteFooter>
  );
}

export default Footer;
