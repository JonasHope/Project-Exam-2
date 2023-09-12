function calculateTotalPrice(venueData, dateRange, selectedGuests) {
  if (venueData) {
    const basePricePerNight = venueData.price;
    const numberOfNights =
      dateRange[0] && dateRange[1]
        ? Math.ceil((dateRange[1] - dateRange[0]) / (24 * 60 * 60 * 1000))
        : 0;

    return basePricePerNight * numberOfNights * selectedGuests;
  }
  return 0;
}

export default calculateTotalPrice;
