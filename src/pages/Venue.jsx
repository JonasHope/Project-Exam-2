import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchVenue } from "../API/apiVenues";

function Venue() {
  const [venueData, setVenueData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchVenue(id)
      .then((data) => {
        setVenueData(data);
      })
      .catch((error) => {
        console.error("Error fetching venue:", error);
      });
  }, [id]);

  return (
    <div>
      {venueData ? (
        <>
          <h1>{venueData.name}</h1>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Venue;
