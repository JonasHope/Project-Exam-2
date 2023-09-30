import styled from "styled-components";

const ThemedButton = styled.button`
  border: none;
  background-color: ${(props) => props.theme.color.c3};
  color: ${(props) => props.theme.color.c5};
  padding: 15px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.c6};
  }

  &:disabled {
    background-color: ${(props) => props.theme.color.c4};
  }
`;

export default ThemedButton;
