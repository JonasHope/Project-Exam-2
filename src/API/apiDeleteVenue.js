import { BASE_URL } from "./apiConsts";

const Venue_URL = "/venues"

export async function deleteVenue(id) {
  if (!id) {
    throw new Error("Missing venue ID");
  }

  const url = `${BASE_URL}${Venue_URL}/${id}`;

  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("Access token not found in local storage.");
  }

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    
    "Content-Type": "application/json", 
  };

  const requestOptions = {
    method: "DELETE", 
    headers,
  };

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw new Error(`Failed to delete booking: ${response.statusText}`);
  }

  
  return 
}