import { constants } from '../api/constants';
import { useGetAPI } from '../api/apiCalls';

import { VenueCard } from '../components/VenueCard';
import { Filters } from '../components/Venues/Filters';

export function Venues() {
  const url =
    constants.base + constants.holidaze.base + constants.holidaze.venues.rating;

  const { data, error, loading } = useGetAPI(url);

  return (
    <>
      <section className="w-11/12 max-w-screen-2xl mx-auto flex flex-col gap-5">
        <h1 className="text-2xl font-bold mt-5">Venues</h1>
        <Filters />
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {data && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {data.data.map((venue) => (
              <VenueCard key={venue.id} {...venue} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
