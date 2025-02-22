/**
 * Extracts and formats the amenities from the given item object, adding images.
 *
 * @param {Object} item - The object containing amenity keys and their boolean values.
 * @returns {Array} An array of objects with formatted amenity names and image URLs.
 */
export function getAmenities(item) {
  const amenityImages = {
    wifi: '/assets/Wifi.png',
    pets: '/assets/Pet.png',
    parking: '/assets/Parking.png',
    breakfast: '/assets/Coffee.png',
  };

  return Object.keys(item)
    .filter((key) => item[key])
    .map((key) => ({
      name:
        key === 'pets'
          ? 'Pet friendly'
          : key.charAt(0).toUpperCase() + key.slice(1),
      image: amenityImages[key] || '/images/default.png', // Default image fallback
    }));
}
