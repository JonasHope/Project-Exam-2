import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: -45%;
  right: 0;
  width: 200px;
  height: 300px;
  overflow-y: scroll;
  background-color: ${(props) => props.theme.color.c5};
  border: 2px solid ${(props) => props.theme.color.c1};
  border-radius: 10px;
  z-index: 1;
  cursor: pointer;
`;

const DropdownOption = styled.div`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.color.c2};
  }
`;

const CustomCountryDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <DropdownWrapper>
      <div onClick={() => setIsOpen(!isOpen)}>
        {value ? value : "Country "}
        <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
      </div>
      {isOpen && (
        <DropdownContainer>
          {options.map((option) => (
            <DropdownOption
              key={option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </DropdownOption>
          ))}
        </DropdownContainer>
      )}
    </DropdownWrapper>
  );
};

export default CustomCountryDropdown;
