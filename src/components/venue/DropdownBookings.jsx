import { constants } from '../../api/constants';
import { useGetAPI } from '../../api/apiCalls';
import { getStorage } from '../../storage/localStorage';

import { dateFormat } from '../../utils/dateFormat';

export function DropdownBookings({ id }) {
  const endpoint = `${constants.base}${constants.holidaze.base}${constants.holidaze.venues.clear}/${id}${constants.holidaze.venues.bookings}`;
  const token = JSON.parse(getStorage('token'));

  const { data, error, loading } = useGetAPI(endpoint, token);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <>
          {data.data.bookings.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {data.data.bookings.map((booking) => (
                <li
                  className="flex flex-col gap-2 p-2 rounded-md bg-holidaze-light"
                  key={booking.id}
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-xl">
                      {booking.customer.name}
                    </span>
                    <span className="font-light">{booking.customer.email}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-bold">Date</span>
                    <span className="font-light">
                      {dateFormat(booking.dateFrom)} -{' '}
                      {dateFormat(booking.dateTo)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-bold">Guests</span>
                    <span className="font-light">{booking.guests}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings available.</p>
          )}
        </>
      )}
    </>
  );
}
