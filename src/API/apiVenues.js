import { BASE_URL } from "./apiConsts";

const Venues_URL = "/venues";
const OwnerAndBooking_URL = "/?_owner=true&_bookings=true";
const PageSize = 100; 

export async function fetchVenues(sortOrder) {
  const allVenues = [];
  let offset = 0;

  while (true) {
    const url = `${BASE_URL}${Venues_URL}?sort=created&sortOrder=${sortOrder}&limit=${PageSize}&offset=${offset}`;
    const response = await fetch(url);
    const venuesChunk = await response.json();

    if (venuesChunk.length === 0) {
      break;
    }

    allVenues.push(...venuesChunk);
    offset += PageSize;
  }

  return allVenues;
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