import { constants } from '../api/constants';
import { useParams } from 'react-router-dom';
import { useGetAPI } from '../api/apiCalls';

import { VenueDetails } from '../components/VenueDetails';
import { VenueAdmin } from '../components/venue/VenueAdmin';
import { getStorage } from '../storage/localStorage';

export function Venue() {
  const { id } = useParams();
  const user = JSON.parse(getStorage('user'));

  const venueUrl =
    constants.base +
    constants.holidaze.base +
    constants.holidaze.venues.clear +
    '/' +
    id +
    constants.holidaze.venues.bookings +
    '&_owner=true';
  const { data, error, loading } = useGetAPI(venueUrl);

  return (
    <section className="w-11/12 mx-auto max-w-screen-2xl mb-20 min-h-[calc(100vh-80px)]">
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}
      {data && (
        <div className="w-full flex flex-col gap-5 md:gap-10">
          {console.log(data)}
          {user.name !== data.data.owner.name ? (
            <>
              <VenueDetails venue={data.data} />
              {console.log('VenueDetails')}
            </>
          ) : (
            <>
              <VenueAdmin venue={data.data} />
              {console.log('VenueAdmin')}
            </>
          )}
        </div>
      )}
    </section>
  );
}
