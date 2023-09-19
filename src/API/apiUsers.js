import { BASE_URL } from "./apiConsts";

const profile_URL = "/profiles";
const BookingAndVenue = "/?_bookings=true&_venues=true"

const userString = localStorage.getItem("user");
const user = JSON.parse(userString);
const fetchName = user?.name

export async function fetchProfile() {

  const name = fetchName;

  const url = `${BASE_URL}${profile_URL}/${name}${BookingAndVenue}`;

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