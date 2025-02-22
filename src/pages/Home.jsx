import { Hero } from '../components/Home/Hero';
import { constants } from '../api/constants';
import { VenueCard } from '../components/venue/VenueCard';

import { useGetAPI } from '../api/apiCalls';
import { NavLink } from 'react-router-dom';

export function Home() {
  const newVenues =
    constants.base + constants.holidaze.base + constants.holidaze.venues.new;

  const maxVenues = 4;

  const { data, error, loading } = useGetAPI(newVenues);

  return (
    <div className="mx-auto max-w-screen-2xl w-11/12 flex flex-col gap-5">
      <Hero />
      <section className="flex flex-col gap-5 w-full items-center">
        <div className="text-xl font-medium w-full uppercase rounded-sm flex flex-col gap-1">
          <h2 className="bg-holidaze-dark text-white text-sm p-1 w-fit rounded-sm">
            New venues
          </h2>
          <div className="bg-holidaze-dark w-full h-[2px] rounded-xl"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          {loading && <p>Loading...</p>}
          {error && <p>Something went wrong, try reloading.</p>}
          {data && (
            <>
              {data.data.slice(0, maxVenues).map((venue) => (
                <VenueCard key={venue.id} {...venue} />
              ))}
            </>
          )}
        </div>
        <NavLink
          to="/venues"
          className="bg-holidaze-dark text-white rounded-sm text-sm sm:text-lg font-medium p-2 uppercase w-fit"
        >
          See more venues
        </NavLink>
      </section>
    </div>
  );
}
