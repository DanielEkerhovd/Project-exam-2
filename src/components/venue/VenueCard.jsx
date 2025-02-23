import { NavLink } from 'react-router-dom';
import { getAmenities } from '../../utils/getAmenities.mjs';
import { Rating } from '../Rating';

export function VenueCard({ id, name, media, rating, meta, maxGuests, price }) {
  const imageUrl = media[0] ? media[0].url : '/assets/placeholder.png';
  const amenities = getAmenities(meta);

  return (
    <div className="bg-white rounded-md">
      {/* Hero */}
      <div className="relative h-[130px] lg:h-[200px]">
        <img
          className={`w-full h-full object-cover rounded-t-md ${!media[0] && 'border-8 border-white'}`}
          src={imageUrl}
          alt=""
        />
        <div className="absolute inline bottom-0 m-2 p-2 backdrop-blur-md bg-black bg-opacity-80 rounded-sm text-white md:text-xl">
          {name.length < 32 ? name : name.substring(0, 28) + '...'}
        </div>
      </div>
      {/* Actions */}
      <div className="p-2 flex flex-col gap-2">
        <Rating rating={rating} />
        <div className="divide-x flex items-center font-extralight text-[11px] md:text-[15px]">
          <span className="pr-1">Up to {maxGuests} guests</span>
          {amenities.map((amenity, index) => (
            <span className="px-1" key={index}>
              {amenity.name}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <NavLink to={`/venue/${id}`}>
            <div className="p-2 rounded-md bg-holidaze-highlight font-bold md:text-lg">
              Book venue
            </div>
          </NavLink>
          <div>
            <span className="font-medium text-lg md:text-2xl">
              {price} ${' '}
              <span className="font-light text-base md:text-lg">/ night</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
