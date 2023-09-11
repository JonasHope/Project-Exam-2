import { BASE_URL } from "./apiConsts";

const Venues_URL = "/venues"

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

  const url = `${BASE_URL}${Venues_URL}/${id}`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
}