import { constants } from '../api/constants';
import { useParams } from 'react-router-dom';
import { useGetAPI } from '../api/apiCalls';

import { VenueDetails } from '../components/VenueDetails';

export function Venue() {
  const { id } = useParams();

  const venueUrl =
    constants.base +
    constants.holidaze.base +
    constants.holidaze.venues.clear +
    '/' +
    id +
    constants.holidaze.venues.bookings;
  const { data, error, loading } = useGetAPI(venueUrl);

  if (data) {
    console.log(data.data);
  }

  return (
    <section className="w-11/12 mx-auto max-w-screen-2xl">
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}
      {data && (
        <div className="w-full flex flex-col gap-5">
          <VenueDetails venue={data.data} />
        </div>
      )}
    </section>
  );
}
