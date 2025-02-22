import { NavLink } from 'react-router-dom';
import { getAmenities } from '../../utils/getAmenities.mjs';
import { dateFormat } from '../../utils/dateFormat.js';
import { HighlightButton } from '../HighlightButton.jsx';

export function VenueBooking(booking) {
  const checkIn = dateFormat(booking.dateFrom);
  const checkOut = dateFormat(booking.dateTo);

  const venue = booking.venue;
  const { name, rating, media, meta } = venue;

  const imageUrl = media[0] ? media[0].url : 'https://via.placeholder.com/300';
  const amenities = getAmenities(meta);

  return (
    <div className="bg-white rounded-md">
      {/* Hero */}
      <div className="relative h-[130px]">
        <img
          className="w-full h-full object-cover rounded-t-md"
          src={imageUrl}
          alt=""
        />
        <div className="absolute inline bottom-0 m-2 p-2 backdrop-blur-md bg-black bg-opacity-80 rounded-sm text-white">
          {name.length < 32 ? name : name.substring(0, 28) + '...'}
        </div>
      </div>
      {/* Actions */}
      <div
        className="p-2 flex flex-col gap-3
      "
      >
        <div className="flex items-center gap-1">
          {rating === 0 ? (
            <span className="text-gray-500 text-[10px]">No ratings</span>
          ) : (
            Array.from({ length: 5 }, (_, i) => (
              <img
                key={i}
                src={
                  rating > i
                    ? '/assets/rating-good.png'
                    : '/assets/rating-bad.png'
                }
                className="size-4"
              />
            ))
          )}
        </div>
        <div className="divide-x flex items-center font-extralight text-[11px]">
          {amenities.map((amenity, index) => (
            <span className="px-1" key={index}>
              {amenity.name}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">Booking dates:</span>
          <div className="flex items-center gap-1 text-sm font-light">
            <span className="">{checkIn}</span>
            <span className="">-</span>
            <span className="">{checkOut}</span>
          </div>
        </div>

        <NavLink to={`/venue/${venue.id}`}>
          <HighlightButton text="View venue" />
        </NavLink>
      </div>
    </div>
  );
}
