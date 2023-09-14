import React from "react";

function DescriptionTab({ venueData }) {
  return (
    <div>
      <p>{venueData?.description}</p>
    </div>
  );
}

export default DescriptionTab;
