import { useState, useEffect } from 'react';

import { Rating } from './Rating';
import { getAmenities } from '../utils/getAmenities.mjs';
import { HighlightButton } from './HighlightButton';

import { VenueCalendar } from './Calendar';
import { getBookings } from '../utils/getBookings.js';

import { useLoginStatus } from '../hooks/loginStatus.js';
import { NavLink } from 'react-router-dom';

export function VenueDetails({ venue }) {
  const [currentImage, setCurrentImage] = useState('');
  const [fade, setFade] = useState(false);
  const { isLoggedIn } = useLoginStatus();

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

  return (
    <>
      <div className="w-full flex flex-col">
        <img
          className={`w-full h-[150px] object-cover rounded-md transition-opacity duration-100 ${
            fade ? 'opacity-0' : 'opacity-100'
          }`}
          src={currentImage}
          alt=""
        />
        {images.length > 1 && (
          <div className="grid grid-cols-2 gap-2 mt-2">
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
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">{venue.name}</h2>
        {location.country && <p className="font-light">{location.country}</p>}
        <Rating rating={venue.rating} />
        <span className="font-extralight text-[11px]">
          Up to {venue.maxGuests} guests
        </span>
      </div>
      {isLoggedIn ? (
        <div>
          <HighlightButton text="Book venue" />
        </div>
      ) : (
        <NavLink to="/login" className="text-white">
          <HighlightButton text="Login to book" />
        </NavLink>
      )}

      {venue.description && venue.description.length > 0 && (
        <p className="font-light">{venue.description}</p>
      )}
      {ameneties && ameneties.length > 0 && (
        <>
          <h3 className="text-lg">Ameneties</h3>
          <div className="flex items-center gap-2">
            {ameneties.map((amenity, index) => (
              <span
                key={index}
                className="flex flex-col items-center font-extralight text-[12px]"
              >
                <img
                  className="size-8"
                  src={amenity.image}
                  alt={amenity.name}
                />
                <span>{amenity.name}</span>
              </span>
            ))}
          </div>
        </>
      )}
      {isLoggedIn && <VenueCalendar bookings={bookings} venue={venue} />}
    </>
  );
}
