import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import logo from "../images/logo.png";

const MyHeader = styled.header`
  background-color: ${(props) => props.theme.color.c1};
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

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  max-width: 1200px;
  margin: auto;
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

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.modalopen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
`;

const Input = styled.input`
  display: flex;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const LoginForm = styled.form``;

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
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
          <AccountButton onClick={openModal}>Login</AccountButton>
        </LoginContainer>
        <ModalBackground modalopen={isModalOpen} onClick={handleModalClick}>
          <ModalContent>
            <CloseButton onClick={closeModal}>x</CloseButton>
            <h2>Login</h2>
            <LoginForm id="loginForm">
              <label for="email">Email</label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                required
                pattern="^[\w\-.]+@(stud.)?noroff.no$"
                title="Only @(stud.)noroff.no domains are allowed to login."
              />
              <label for="password">Password</label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
              <button type="submit">Login</button>
            </LoginForm>
          </ModalContent>
        </ModalBackground>
      </Nav>
    </MyHeader>
  );
}

export default Header;
