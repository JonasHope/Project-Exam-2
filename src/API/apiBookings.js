import { BASE_URL } from "./apiConsts";

const Bookings_URL = "/bookings"

export async function fetchBookings() {
  const url = `${BASE_URL}${Bookings_URL}`;
  const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
    throw new Error("Access token not found in local storage.");
  }
    const headers = {
    Authorization: `Bearer ${accessToken}`,
    };
  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch bookings: ${response.statusText}`);
  }

  const json = await response.json();
  return json;
}

export async function fetchBooking(id) {
  if (!id) {
    throw new Error("Missing venue ID");
  }

  const url = `${BASE_URL}${Bookings_URL}/${id}`;

  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("Access token not found in local storage.");
  }

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    
    "Content-Type": "application/json", 
  };

  const requestOptions = {
    method: "GET", 
    headers,
  };

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw new Error(`Failed to fetch booking: ${response.statusText}`);
  }

  const json = await response.json();
  return json;
}