import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import logo from "../images/logo.png";
import Modal from "../Modal";

const MyHeader = styled.header`
  background-color: ${(props) => props.theme.color.c1};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  max-width: 1200px;
  margin: auto;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  height: 40px;
  width: 30px;
  padding: 0px 10px;
`;

const LogoTextDiv = styled.div``;

const Logo = styled.h2`
  font-size: 30px;
  font-family: "poppins-m";
  margin: 0px;
`;

const Slogan = styled.p`
  font-size: 12px;
  margin: 0px;
`;

const NavUl = styled.ul`
  display: flex;
`;

const NavLinks = styled.li`
  padding: 10px;
  list-style-type: none;
`;

const LoginContainer = styled.div`
  width: 260px;
`;

const AccountButton = styled.a`
  display: flex;
  justify-content: flex-end;
  padding: 0px 10px;
  border: none;
  background: none;
  cursor: pointer;
`;

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <MyHeader>
      <Nav>
        <Link to="/">
          <LogoContainer>
            <LogoImg src={logo} alt="Logo" />
            <LogoTextDiv>
              <Logo>Holidaze</Logo>
              <Slogan>Where Creators and Explorers unite</Slogan>
            </LogoTextDiv>
          </LogoContainer>
        </Link>
        <NavUl>
          <NavLinks>
            <Link to="/">Home</Link>
          </NavLinks>
          <NavLinks>
            <Link to="/Venues">Venues</Link>
          </NavLinks>
        </NavUl>
        <LoginContainer>
          <AccountButton onClick={openModal}>Login</AccountButton>
        </LoginContainer>
        <Modal isOpen={isModalOpen} onClose={closeModal} />
      </Nav>
    </MyHeader>
  );
}

export default Header;
