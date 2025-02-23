import { NavLink } from 'react-router-dom';
import { useGetAPI } from '../../api/apiCalls';
import { constants } from '../../api/constants';
import { getStorage } from '../../storage/localStorage';
import { ErrorMessage } from '../ErrorMessage';
import { VenueBooking } from '../venue/VenueBooking';

export function UserBookings({ user }) {
  const url =
    constants.base +
    constants.holidaze.base +
    constants.holidaze.profiles +
    user.name +
    constants.holidaze.bookings;
  const token = JSON.parse(getStorage('user')).accessToken;
  const { data, error, loading } = useGetAPI(url, token);

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-semibold text-xl md:text-3xl">Your bookings</h2>
      {loading && <p>Loading...</p>}
      {error && <ErrorMessage />}
      {data &&
        (data.data && data.data.length > 0 ? (
          <>
            <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {data.data.map((booking) => (
                <VenueBooking key={booking.id} {...booking} />
              ))}
            </ul>
          </>
        ) : (
          <div className="flex flex-col gap-2">
            <p>You have no bookings</p>
            <NavLink
              to="/venues"
              className="bg-holidaze-dark text-white font-bold py-2 px-4 rounded w-fit"
            >
              Book now
            </NavLink>
          </div>
        ))}
    </div>
  );
}
