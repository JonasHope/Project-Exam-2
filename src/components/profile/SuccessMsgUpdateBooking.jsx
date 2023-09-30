import React from "react";
import styled from "styled-components";

const MessageContainer = styled.div`
  background-color: green;
  color: white;
  padding: 10px;
  margin-top: 15px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0px;
`;

const MessageText = styled.p`
  margin: 0;
`;

const RefreshButton = styled.button`
  background-color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
`;

function Message({ text, refreshBookings }) {
  return (
    <MessageContainer>
      <MessageText>{text}</MessageText>
      {refreshBookings && (
        <RefreshButton onClick={refreshBookings}>Refresh</RefreshButton>
      )}
    </MessageContainer>
  );
}

export default Message;
