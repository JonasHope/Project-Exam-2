import React from "react";
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0px;
`;

const PageNumber = styled.span`
  margin: 0 10px;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  color: ${(props) => (props.active ? "blue" : "black")};

  &:hover {
    text-decoration: underline;
  }
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <PaginationContainer>
      {totalPages > 1 && (
        <div>
          {Array.from({ length: totalPages }).map((_, index) => (
            <PageNumber
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </PageNumber>
          ))}
        </div>
      )}
    </PaginationContainer>
  );
};

export default Pagination;
