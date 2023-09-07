import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const CustomDropdownContainer = styled.div`
  display: inline-block;
  position: relative;
`;

const Label = styled.label`
  margin-right: 5px;
  cursor: pointer;
`;

const Select = styled.select`
  display: none;
  background-color: inherit;
  border: none;
  font-size: 1rem;
  color: ${(props) => props.theme.color.c3};
  padding: 5px;
  cursor: pointer;
`;

const DropdownOptions = styled.div`
  position: absolute;
  width: 100%;
  background-color: ${(props) => props.theme.color.c1};
  border: 1px solid ${(props) => props.theme.color.c2};
  border-top: none;
  border-radius: 5px;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  z-index: 999;
`;

const Option = styled.div`
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${(props) => props.theme.color.c3};
    color: ${(props) => props.theme.color.c5};
  }
`;

function CustomDropdown({
  options,
  selectedOption,
  onOptionChange,
  label,
  initialLabel,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const customDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        customDropdownRef.current &&
        !customDropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSelectChange = (event) => {
    const newSelectedOption = event.target.value;
    onOptionChange(newSelectedOption);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CustomDropdownContainer ref={customDropdownRef}>
      <Label htmlFor="customDropdown" onClick={toggleDropdown}>
        {label} <b>{initialLabel}</b>
      </Label>
      <Select
        id="customDropdown"
        value={selectedOption}
        onChange={handleSelectChange}
        onClick={(e) => e.stopPropagation()}
        onBlur={() => setIsOpen(false)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <DropdownOptions
        className="placement"
        isOpen={isOpen ? "true" : undefined}
      >
        {options.map((option) => (
          <Option
            key={option.value}
            onClick={() =>
              handleSelectChange({ target: { value: option.value } })
            }
          >
            {option.label}
          </Option>
        ))}
      </DropdownOptions>
    </CustomDropdownContainer>
  );
}

export default CustomDropdown;
