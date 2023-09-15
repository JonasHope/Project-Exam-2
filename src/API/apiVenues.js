import { BASE_URL } from "./apiConsts";

const Venues_URL = "/venues"
const OwnerAndBooking_URL = "/?_owner=true&_bookings=true"

export async function fetchVenues(sortOrder) {
  const url = `${BASE_URL}${Venues_URL}?sort=created&sortOrder=${sortOrder}`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

export async function fetchVenue(id) {
    if (!id) {
        throw new Error('Missing venue ID');
    }

  const url = `${BASE_URL}${Venues_URL}/${id}${OwnerAndBooking_URL}`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
}