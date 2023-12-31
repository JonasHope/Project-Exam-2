import React, { useState } from "react";
import styled from "styled-components";
import CustomDropdown from "../dropdowns/CustomDropdown";

const SortingVenuesContainer = styled.div`
  font-size: 0.9rem;
`;

function SortingVenues({ onSortChange }) {
  const [selectedSortOrder, setSelectedSortOrder] = useState("desc");

  const sortOptions = [
    { label: "Most Recent", value: "desc" },
    { label: "Least Recent", value: "asc" },
  ];

  const handleSortChange = (newSortOrder) => {
    setSelectedSortOrder(newSortOrder);
    onSortChange(newSortOrder);
  };

  const initialLabel =
    sortOptions.find((option) => option.value === selectedSortOrder)?.label ||
    "";

  return (
    <SortingVenuesContainer>
      <CustomDropdown
        options={sortOptions}
        selectedOption={selectedSortOrder}
        onOptionChange={handleSortChange}
        label="Sort venues:"
        initialLabel={initialLabel}
      />
    </SortingVenuesContainer>
  );
}

export default SortingVenues;
