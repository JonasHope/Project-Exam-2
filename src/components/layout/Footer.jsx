import React from "react";
import { styled } from "styled-components";

const SiteFooter = styled.footer`
  background-color: ${(props) => props.theme.color.c5};
  margin-top: auto;
  text-align: center;
  box-shadow: 1px -1px 3px ${(props) => props.theme.color.c4};
`;

const FooterDiv = styled.div``;

const StyledP = styled.p`
  color: ${(props) => props.theme.color.c3};
`;

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
