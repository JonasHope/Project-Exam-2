import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackButton = styled.div`
  cursor: pointer;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-right: 5px;
`;

function GoBackClick() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <BackButton onClick={goBack}>
      <StyledFontAwesomeIcon icon={faArrowLeft}></StyledFontAwesomeIcon>
      Go Back
    </BackButton>
  );
}

export default GoBackClick;
