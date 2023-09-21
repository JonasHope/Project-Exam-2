import { BASE_URL } from "./apiConsts";

const Bookings_URL = "/bookings"

export async function updateBooking(bookingId, selectedDates) {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!selectedDates[0] || !selectedDates[1]) {
      return { success: false, message: "Selected dates are invalid." };
    }

    const bookingData = {
      dateFrom: selectedDates[0].toISOString(),
      dateTo: selectedDates[1].toISOString(),
      guests: 1,
    };

    const response = await fetch(
      `https://api.noroff.dev/api/v1/holidaze/bookings/${bookingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(bookingData),
      }
    );

    if (response.ok) {
      return { success: true, message: "Booking updated successfully." };
    } else {
      return { success: false, message: "Failed to update booking." };
    }
  } catch (error) {
    console.error("An error occurred while making the booking:", error);
    return { success: false, message: "An error occurred while updating booking." };
  }
}

export async function deleteBooking(id) {
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
    method: "DELETE", 
    headers,
  };

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw new Error(`Failed to delete booking: ${response.statusText}`);
  }

  
  return 
}