const BASE_URL = "https://api.noroff.dev/api/v1/holidaze/venues";

export async function fetchVenues(sortOrder) {
  const url = `${BASE_URL}?sort=created&sortOrder=${sortOrder}`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
}