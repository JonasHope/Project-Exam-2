import React from "react";

function LocationTab({ venueData }) {
  return (
    <div>
      <p>{venueData?.description}</p>
    </div>
  );
}

export default LocationTab;
