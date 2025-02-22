import { NavLink } from 'react-router-dom';
import { getAmenities } from '../../utils/getAmenities.mjs';
import { Rating } from '../Rating';
import { DropdownBookings } from './DropdownBookings';
import { useState } from 'react';

export function VenueManager({ venueInfo }) {
  const { id, name, media, rating, meta, maxGuests, price } = venueInfo;
  const imageUrl = media[0] ? media[0].url : '/assets/placeholder.png';
  const amenities = getAmenities(meta);

  const [bookings, setBookings] = useState(false);

  return (
    <div className="bg-white rounded-md">
      <div className="relative h-[130px]">
        <img
          className={`w-full h-full object-cover rounded-t-md ${!media[0] && 'border-8 border-white'}`}
          src={imageUrl}
          alt=""
        />
        <div className="absolute inline bottom-0 m-2 p-2 backdrop-blur-md bg-black bg-opacity-80 rounded-sm text-white">
          {name.length < 32 ? name : name.substring(0, 28) + '...'}
        </div>
      </div>
      <div className="p-2 flex flex-col gap-2">
        <Rating rating={rating} />
        <div className="divide-x flex items-center font-extralight text-[11px]">
          <span className="pr-1">Up to {maxGuests} guests</span>
          {amenities.map((amenity, index) => (
            <span className="px-1" key={index}>
              {amenity.name}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col sm:flex-row gap-2">
            <NavLink to={`/venue/${id}`}>
              <div className="p-2 rounded-sm bg-holidaze-highlight font-bold">
                Manage venue
              </div>
            </NavLink>
            <button
              onClick={() => setBookings(!bookings)}
              className="p-2 rounded-sm bg-holidaze-dark text-white font-bold"
            >
              {bookings ? 'Hide bookings' : 'Show bookings'}
            </button>
          </div>
          <div>
            <span className="font-medium text-lg">
              {price} $ <span className="font-light text-base">/ night</span>
            </span>
          </div>
        </div>
        {bookings && <DropdownBookings id={id} />}
      </div>
    </div>
  );
}
