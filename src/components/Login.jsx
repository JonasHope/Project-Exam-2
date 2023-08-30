import React, { useState } from "react";
import { styled } from "styled-components";

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

function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        alert("your logged in");
      } else {
        alert("login failed");
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <ModalBackground
      modalopen={isOpen ? "true" : undefined}
      onClick={handleModalClick}
    >
      <ModalContent>
        <CloseButton onClick={onClose}>x</CloseButton>
        <h2>Login</h2>
        <LoginForm onSubmit={handleLoginSubmit}>
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
          <button type="submit">Login</button>
        </LoginForm>
      </ModalContent>
    </ModalBackground>
  );
}

export default LoginModal;
