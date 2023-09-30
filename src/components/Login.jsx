import React, { useState } from "react";
import { styled } from "styled-components";
import loginfeat from "./images/loginfeat.jpg";
import ThemedButton from "../styles/Button";
import { StyleSheetManager } from "styled-components";

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
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${(props) => props.theme.color.c5};
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  width: 50vw;
  min-height: 50vh;
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
  padding: 10px;
  margin: 0px 0px 10px 0px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ImageContainer = styled.div`
  background-image: url(${loginfeat});
  width: 50%;
  background-repeat: no-repeat, no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 10px;
`;

const FormContainer = styled.div`
  padding: 20px;
  width: 50%;

  ${(props) => props.theme.media.mobile} {
    padding: 0px 0px 20px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70vw;
  }
`;

const Form = styled.form`
  width: 90%;
  display: flex;
  flex-direction: column;
`;

const RegisterAccount = styled.p`
  cursor: pointer;
`;

const RegFormContainer = styled.div`
  display: flex;
  width: 100%;
`;

const ErrorMsg = styled.div`
  color: darkred;
`;

function RegisterForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [venueManager, setVenueManager] = useState(false);
  const [failResponse, setFailResponse] = useState("");

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://api.noroff.dev/api/v1/holidaze/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            avatar,
            venueManager,
          }),
        }
      );

      if (response.ok) {
        console.log("Registration successful");
      } else {
        const failedResponse = await response.json();
        const failMessages = failedResponse.errors.map((error, index) => (
          <div key={index}>{error.message}</div>
        ));
        setFailResponse(failMessages);
      }
    } catch (error) {
      console.error(error, "error");
    }
  };

  return (
    <RegFormContainer>
      <ImageContainer></ImageContainer>
      <FormContainer>
        <CloseButton onClick={onSubmit}>x</CloseButton>
        <h2>Register</h2>
        <Form onSubmit={handleRegisterSubmit}>
          <label htmlFor="name">Name</label>
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            required
            pattern="^[\w\-.]+@(stud.)?noroff.no$"
            title="Only @(stud.)noroff.no domains are allowed to register."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="avatar">Avatar</label>
          <Input
            id="avatar"
            type="text"
            name="avatar"
            placeholder="Avatar"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              checked={venueManager}
              onChange={() => setVenueManager(!venueManager)}
            />
            Venue Manager
          </label>
          <ThemedButton type="submit">Register</ThemedButton>
          <ErrorMsg>{failResponse}</ErrorMsg>
        </Form>
        <RegisterAccount onClick={onSubmit}>
          Already have an account?
        </RegisterAccount>
      </FormContainer>
    </RegFormContainer>
  );
}

function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://api.noroff.dev/api/v1/holidaze/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data));
        window.location.reload();
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error(error, "error");
    }
  };

  return (
    <StyleSheetManager
      shouldForwardProp={(prop) => !["modalopen"].includes(prop)}
    >
      <ModalBackground
        modalopen={isOpen ? "true" : undefined}
        onClick={handleModalClick}
      >
        <ModalContent>
          {showRegister ? (
            <RegisterForm onSubmit={() => setShowRegister(false)} />
          ) : (
            <>
              <ImageContainer></ImageContainer>
              <FormContainer>
                <CloseButton onClick={onClose}>x</CloseButton>
                <h2>Login</h2>
                <Form onSubmit={handleLoginSubmit}>
                  <label htmlFor="email">Email</label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    pattern="^[\w\-.]+@(stud.)?noroff.no$"
                    title="Only @(stud.)noroff.no domains are allowed to login."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="password">Password</label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <ThemedButton type="submit">Login</ThemedButton>
                </Form>
                <RegisterAccount onClick={() => setShowRegister(true)}>
                  Don't have an account?
                </RegisterAccount>
              </FormContainer>
            </>
          )}
        </ModalContent>
      </ModalBackground>
    </StyleSheetManager>
  );
}

export default LoginModal;
