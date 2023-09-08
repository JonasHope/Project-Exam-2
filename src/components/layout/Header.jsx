import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import logo from "../images/logo.png";
import LoginModal from "../Login";

const MyHeader = styled.header`
  background-color: ${(props) => props.theme.color.c5};
  box-shadow: 0px 3px 6px rgb(239, 243, 246);
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  max-width: 1440px;
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
  font-size: 1.5rem;
  font-family: "poppins-m";
  margin: 0px;
`;

const Slogan = styled.p`
  font-size: 0.7rem;
  margin: 0px;
`;

const NavUl = styled.ul`
  display: flex;
  margin: 0px;
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accountInfo = localStorage.getItem("user");
    setIsLoggedIn(!!accountInfo);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAccountButtonClick = () => {
    if (isLoggedIn) {
      localStorage.clear();
      setIsLoggedIn(false);
    } else {
      openModal();
    }
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
          <AccountButton onClick={handleAccountButtonClick}>
            {isLoggedIn ? "Logout" : "Login"}
          </AccountButton>
        </LoginContainer>
        <LoginModal isOpen={isModalOpen} onClose={closeModal} />
      </Nav>
    </MyHeader>
  );
}

export default Header;
