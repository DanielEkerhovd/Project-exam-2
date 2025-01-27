export function getAmenities(item) {
  const amenities = Object.keys(item).filter((key) => item[key]);
  if (amenities.includes("pets")) {
    amenities[amenities.indexOf("pets")] = "pet friendly";
  }

  amenities.forEach((amenity, index) => {
    amenities[index] = amenity.charAt(0).toUpperCase() + amenity.slice(1);
  });
  return amenities;
}
