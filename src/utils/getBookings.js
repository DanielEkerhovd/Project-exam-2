import { parseISO, eachDayOfInterval, format } from 'date-fns';

/**
 * Extracts all booked dates from a list of bookings and formats them as 'yyyy-MM-dd'.
 * @param {Array} bookings - Array of booking objects.
 * @returns {string[]} Array of formatted booked dates as strings.
 */
export function getBookings(bookings) {
  let bookedDates = [];

  bookings.forEach((booking) => {
    const startDate = parseISO(booking.dateFrom);
    const endDate = parseISO(booking.dateTo);

    // Generate an array of all dates between startDate and endDate
    const datesInRange = eachDayOfInterval({ start: startDate, end: endDate });

    // Format each date and add to the bookedDates array
    const formattedDates = datesInRange.map((date) =>
      format(date, 'yyyy-MM-dd'),
    );
    bookedDates = [...bookedDates, ...formattedDates];
  });

  console.log(bookedDates); // You can remove this later.

  return bookedDates;
}
