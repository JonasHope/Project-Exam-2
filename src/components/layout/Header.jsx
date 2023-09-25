import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled, StyleSheetManager } from "styled-components";
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
  padding: 0px;
`;

const NavLinks = styled.li`
  padding: 10px;
  list-style-type: none;
  display: ${(props) => (props.showOnMobile ? "none" : "block")};
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
  width: 20px;
`;

const Dropdown = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
`;

const DropdownButton = styled(AccountButton)`
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 110%;
  right: 3%;

  background-color: ${(props) => props.theme.color.c4};
  color: ${(props) => props.theme.color.c5};
  box-shadow: 0px 3px 6px rgb(239, 243, 246);
  border-radius: 5px;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const StyledLink = styled(Link)`
  color: white;
`;

const DropdownMenuItem = styled.div`
  padding: 10px 30px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.c1};
    color: ${(props) => props.theme.color.c4};

    ${StyledLink} {
      color: ${(props) => props.theme.color.c4};
    }
  }
`;

const Hamburger = styled.span`
  font-size: 1.5rem;
`;

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const accountInfo = localStorage.getItem("user");
    setIsLoggedIn(!!accountInfo);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <StyleSheetManager
      shouldForwardProp={(prop) => !["isOpen", "showOnMobile"].includes(prop)}
    >
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
            <NavLinks showOnMobile={screenWidth <= 992}>
              <Link to="/">Home</Link>
            </NavLinks>
            <NavLinks showOnMobile={screenWidth <= 992}>
              <Link to="/Venues">Venues</Link>
            </NavLinks>
          </NavUl>
          <LoginContainer>
            <Dropdown>
              <DropdownButton onClick={toggleDropdown}>
                <Hamburger>&#9776;</Hamburger>
              </DropdownButton>
              <DropdownMenu isOpen={isDropdownOpen}>
                {screenWidth <= 992 && (
                  <>
                    <DropdownMenuItem>
                      <StyledLink to="/">Home</StyledLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <StyledLink to="/Venues">Venues</StyledLink>
                    </DropdownMenuItem>
                  </>
                )}
                {isLoggedIn && (
                  <DropdownMenuItem>
                    <StyledLink to="/Profile">Profile</StyledLink>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleAccountButtonClick}>
                  {isLoggedIn ? "Logout" : "Login"}
                </DropdownMenuItem>
              </DropdownMenu>
            </Dropdown>
          </LoginContainer>
          <LoginModal isOpen={isModalOpen} onClose={closeModal} />
        </Nav>
      </MyHeader>
    </StyleSheetManager>
  );
}

export default Header;
