import { NavLink } from "react-router-dom";
import { getAmenities } from "../utils/getAmenities.mjs";

export function VenueCard({ id, name, media, rating, meta, maxGuests, price }) {
  const imageUrl = media[0] ? media[0].url : "https://via.placeholder.com/300";
  const amenities = getAmenities(meta);

  console.log(amenities);

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
          <h2>{name}</h2>
        </div>
      </div>
      {/* Actions */}
      <div className="p-2 flex flex-col gap-2">
        <div className="flex items-center gap-1">
          {rating === 0 ? (
            <span className="text-gray-500 text-[10px]">No ratings</span>
          ) : (
            Array.from({ length: 5 }, (_, i) => (
              <img
                key={i}
                src={
                  rating > i
                    ? "/assets/rating-good.png"
                    : "/assets/rating-bad.png"
                }
                className="size-4"
              />
            ))
          )}
        </div>
        <div className="divide-x flex items-center font-extralight text-[11px]">
          <span className="pr-1">Up to {maxGuests} guests</span>
          {amenities.map((amenity, index) => (
            <span className="px-1" key={index}>
              {amenity}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <NavLink to={`/venue/${id}`}>
            <div className="p-2 rounded-md bg-holidaze-highlight font-bold">
              Book venue
            </div>
          </NavLink>
          <div>
            <span className="font-medium text-lg">
              {price} $ <span className="font-light text-base">/ night</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
