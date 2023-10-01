import { BASE_URL } from "../base/apiConsts"

const profile_URL = "/profiles"
const media_URL = "/media"
const userString = localStorage.getItem("user");
const user = JSON.parse(userString);
const fetchName = user?.name

export async function updateAvatar(accessToken, newAvatar) {

  const url = `${BASE_URL}${profile_URL}/${fetchName}${media_URL}`;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const requestBody = JSON.stringify({ avatar: newAvatar });

  const requestOptions = {
    method: "PUT",
    headers,
    body: requestBody,
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to update avatar: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error(`Error updating avatar: ${error.message}`);
  }
}