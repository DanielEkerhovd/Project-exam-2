import { useState, useEffect } from 'react';
import { Rating } from '../Rating';
import { getAmenities } from '../../utils/getAmenities.mjs';
import { VenueCalendar } from '../Calendar';
import { getBookings } from '../../utils/getBookings.js';
import { useNavigate } from 'react-router-dom';
import { useLoginStatus } from '../../hooks/loginStatus.js';
import { EditVenue } from './EditVenue.jsx';
import { useDeleteAPI } from '../../api/apiCalls.js';
import { constants } from '../../api/constants.js';
import { getStorage } from '../../storage/localStorage.js';

export function VenueAdmin({ venue }) {
  const [currentImage, setCurrentImage] = useState('');
  const [fade, setFade] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const [deleteActive, setDeleteActive] = useState(false);

  const navigate = useNavigate();

  const deleteUrl =
    constants.base +
    constants.holidaze.base +
    constants.holidaze.venues.clear +
    '/' +
    venue.id;
  const token = JSON.parse(getStorage('user')).accessToken;

  const { isLoggedIn } = useLoginStatus();
  const { data, loading, error, deleteData } = useDeleteAPI();

  const images = venue.media;
  const location = venue.location;
  const ameneties = getAmenities(venue.meta);
  const bookings = getBookings(venue.bookings);

  useEffect(() => {
    if (images.length > 0 && images[0].url) {
      setCurrentImage(images[0].url);
    } else {
      setCurrentImage('/assets/placeholder.png');
    }
  }, [images]);

  const changeImage = (url) => {
    if (url !== currentImage) {
      setFade(true);
      setTimeout(() => {
        setCurrentImage(url);
        setFade(false);
      }, 100);
    }
  };

  const deleteVenue = () => {
    deleteData(deleteUrl, token);
  };

  useEffect(() => {
    if (data) {
      navigate('/profile');
    }
  }, [data, navigate]);

  return (
    <div>
      <div className="w-full flex flex-col md:items-end">
        <img
          className={`w-full h-[150px] sm:h-[250px] md:h-[350px] object-cover rounded-md transition-opacity duration-100 ${
            fade ? 'opacity-0' : 'opacity-100'
          }`}
          src={currentImage}
          alt=""
        />
        {images.length > 1 && (
          <div
            className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-${images.length} gap-3 mt-3`}
          >
            {images.map((image, index) => (
              <img
                key={index}
                className={`object-cover h-[60px] w-full rounded-md cursor-pointer hover:opacity-80 ${currentImage === image.url ? 'opacity-80' : ''}`}
                src={image.url}
                alt=""
                onClick={() => changeImage(image.url)}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-between w-full mt-5 md:mt-10">
        <div className="flex flex-col gap-5 sm:gap-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl md:text-4xl font-semibold">{venue.name}</h2>
            {location.country && (
              <p className="font-light">{location.country}</p>
            )}
            <Rating rating={venue.rating} />
            <span className="font-extralight text-[11px] md:text-lg">
              Up to {venue.maxGuests} guests
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <button
                onClick={() => setEditActive(!editActive)}
                className="bg-holidaze-highlight p-2 font-medium rounded-sm"
              >
                {editActive ? 'Cancel edit' : 'Edit venue'}
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setDeleteActive(!deleteActive)}
                  className={`bg-holidaze-alert p-2 font-medium rounded-sm ${
                    deleteActive ? 'px-3' : ''
                  }`}
                >
                  {deleteActive ? 'X' : 'Delete venue'}
                </button>
                {deleteActive && (
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={deleteVenue}
                      className="bg-holidaze-alert p-2 font-bold rounded-sm h-full"
                    >
                      <img
                        className="size-5 object-cover"
                        src="/assets/check.png"
                        alt="delete button"
                      />
                    </button>
                    <span className="font-semibold">
                      {!error && !loading && 'Are you sure?'}
                      {error && 'Error deleting'}
                      {loading && 'Deleting...'}
                    </span>
                  </div>
                )}
              </div>
            </div>
            {editActive && (
              <EditVenue setEditActive={setEditActive} venue={venue} />
            )}
          </div>

          {venue.description && venue.description.length > 0 && (
            <p className="font-light md:text-xl max-w-[600px]">
              {venue.description}
            </p>
          )}
          {ameneties && ameneties.length > 0 && (
            <div className="flex flex-col gap-2">
              <h3 className="text-lg md:text-2xl">Ameneties</h3>
              <div className="flex items-center gap-5">
                {ameneties.map((amenity, index) => (
                  <span
                    key={index}
                    className="flex flex-col items-center font-extralight text-[12px] md:text-lg"
                  >
                    <img
                      className="size-8 md:size-12"
                      src={amenity.image}
                      alt={amenity.name}
                    />
                    <span>{amenity.name}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        {isLoggedIn && <VenueCalendar bookings={bookings} venue={venue} />}
      </div>
    </div>
  );
}
