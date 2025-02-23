import { constants } from '../../api/constants';
import { usePutAPI } from '../../api/apiCalls';
import { getStorage } from '../../storage/localStorage';
import { useState } from 'react';
import { useEffect } from 'react';

export function EditVenue({ setEditActive, venue }) {
  const token = JSON.parse(getStorage('user')).accessToken;
  const endpoint = `${constants.base}${constants.holidaze.base}${constants.holidaze.venues.clear}/${venue.id}`;

  const [venueData, setVenueData] = useState({
    name: venue.name || '',
    description: venue.description || '',
    price: venue.price || 1,
    maxGuests: venue.maxGuests || 1,
    location: {
      address: venue.location.address || '',
    },
    rating: venue.rating || 5,
    meta: {
      wifi: venue.meta.wifi || false,
      pets: venue.meta.pets || false,
      parking: venue.meta.parking || false,
      breakfast: venue.meta.breakfast || false,
    },
    media: venue.media || [],
  });

  const [searching, setSearching] = useState(false);

  const { data, error, loading, putData } = usePutAPI();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setVenueData((prevData) => ({
        ...prevData,
        meta: {
          ...prevData.meta,
          [name]: checked,
        },
      }));
    } else if (name.startsWith('image')) {
      const index = parseInt(name.split('-')[1], 10);
      const newMedia = [...venueData.media];
      newMedia[index] = { url: value };
      setVenueData((prevData) => ({
        ...prevData,
        media: newMedia,
      }));
    } else if (name === 'country') {
      setVenueData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          country: value,
        },
      }));
    } else {
      setVenueData((prevData) => ({
        ...prevData,
        [name]:
          name === 'price' || name === 'maxGuests'
            ? parseInt(value, 10)
            : value,
      }));
    }
  };

  const handleAddImage = () => {
    setVenueData((prevData) => ({
      ...prevData,
      media: [...prevData.media, { url: '' }],
    }));
  };

  const handleRemoveImage = (index) => {
    const newMedia = [...venueData.media];
    newMedia.splice(index, 1);
    setVenueData((prevData) => ({
      ...prevData,
      media: newMedia,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    putData(endpoint, venueData, token);
    setSearching(true);
  };

  useEffect(() => {
    if (error) {
      setSearching(false);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      location.reload();
    }
  }, [data]);

  return (
    <div className="w-full max-w-[500px] bg-white p-6 rounded-lg shadow-md relative">
      <button
        onClick={() => setEditActive(false)}
        className="absolute top-2 right-2 text-white size-7 text-xs bg-holidaze-dark rounded-lg"
      >
        X
      </button>
      {!searching && (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Edit venue
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={venueData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-1"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={venueData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-1"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                min="1"
                max="10000"
                value={venueData.price}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-1"
              />
            </div>
            <div>
              <label
                htmlFor="maxGuests"
                className="block text-sm font-medium text-gray-700"
              >
                Guest capacity (max 100 guests):
              </label>
              <input
                type="number"
                id="maxGuests"
                name="maxGuests"
                min="1"
                max="100"
                value={venueData.maxGuests}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-1"
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country:
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={venueData.country}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Amenities:
              </label>
              <div className="mt-1 space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="wifi"
                    name="wifi"
                    checked={venueData.meta.wifi}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 p-1"
                  />
                  <label
                    htmlFor="wifi"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Wifi
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="pets"
                    name="pets"
                    checked={venueData.meta.pets}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 p-1"
                  />
                  <label
                    htmlFor="pets"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Pets
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="parking"
                    name="parking"
                    checked={venueData.meta.parking}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 p-1"
                  />
                  <label
                    htmlFor="parking"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Parking
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="breakfast"
                    name="breakfast"
                    checked={venueData.meta.breakfast}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 p-1"
                  />
                  <label
                    htmlFor="breakfast"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Breakfast
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Images (URL)
              </label>
              {venueData.media.map((media, index) => (
                <div key={index} className="flex items-center space-x-2 mt-1">
                  <input
                    type="url"
                    name={`image-${index}`}
                    value={media.url}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-1"
                  />

                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddImage}
                className="mt-2 bg-holidaze-dark text-white py-2 px-4 rounded-md shadow-md transition"
              >
                Add Image
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-holidaze-highlight text-black py-2 px-4 rounded-md shadow-md transition"
            >
              Submit
            </button>
          </form>
        </>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
}
