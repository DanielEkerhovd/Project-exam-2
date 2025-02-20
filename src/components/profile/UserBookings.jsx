import { NavLink } from 'react-router-dom';
import { useGetAPI } from '../../api/apiCalls';
import { constants } from '../../api/constants';
import { getStorage } from '../../storage/localStorage';
import { ErrorMessage } from '../ErrorMessage';
import { VenueBooking } from '../VenueBooking';

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
      <h2 className="font-semibold text-xl">Your bookings</h2>
      {loading && <p>Loading...</p>}
      {error && <ErrorMessage />}
      {data &&
        (data.data ? (
          <div className="flex flex-col gap-5">
            <ul className="flex flex-col gap-5">
              {data.data.map((booking) => (
                <VenueBooking key={booking.id} {...booking} />
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <p>You have no bookings</p>
            <NavLink
              to="/bookings"
              className="bg-holidaze-dark text-white font-bold py-2 px-4 rounded w-fit"
            >
              Book now
            </NavLink>
          </div>
        ))}
    </div>
  );
}
