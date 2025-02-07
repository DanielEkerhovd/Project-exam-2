import { constants } from "../api/constants";
import { useGetAPI } from "../api/apiCalls";

import { VenueCard } from "../components/VenueCard";

export function Home() {
  const url =
    constants.base + constants.holidaze.base + constants.holidaze.venues;

  const { data, error, loading } = useGetAPI(url);

  return (
    <>
      <div className="w-11/12 max-w-screen-2xl mx-auto">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {data && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {data.data.map((venue) => (
              <VenueCard key={venue.id} {...venue} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
