import { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import { format, isBefore, isSameDay, startOfToday } from 'date-fns';
import '../calendar.css';

import { constants } from '../api/constants';
import { usePostAPI } from '../api/apiCalls';

export function VenueCalendar({ bookings, venue }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [overlapSelected, setOverlapSelected] = useState(false);
  const [guestsError, setGuestsError] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null);
  const today = startOfToday();
  const modalRef = useRef(null);

  const { data, error, postData } = usePostAPI();

  const bookingUrl = constants.base + constants.holidaze.base + '/bookings';
  const token = JSON.parse(localStorage.getItem('user')).accessToken;

  const maxGuests = venue.maxGuests;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setBookingModalOpen(false);
      }
    };

    if (bookingModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [bookingModalOpen]);

  const isBooked = (date) => {
    return bookings.some((bookedDate) => isSameDay(bookedDate, date));
  };

  useEffect(() => {
    if (dateRange[0] || dateRange[1]) {
      setOverlapSelected(false);
    }
  }, [dateRange]);

  const isValidRange = (startDate, endDate) => {
    return !isBefore(endDate, startDate);
  };

  const handleDateChange = (date) => {
    if (!dateRange[0] || (dateRange[0] && dateRange[1])) {
      setDateRange([date, null]);
    } else if (
      dateRange[0] &&
      !dateRange[1] &&
      isValidRange(dateRange[0], date)
    ) {
      setDateRange([dateRange[0], date]);
    }
  };

  const checkOverlap = (startDate, endDate) => {
    return bookings.some((booking) => {
      // Convert the booking date strings into Date objects
      const bookingStart = new Date(booking);
      const bookingEnd = new Date(booking);
      bookingEnd.setHours(23, 59, 59, 999); // Ensure the end date includes the entire day

      // Make sure the date objects are properly compared
      return (
        (startDate >= bookingStart && startDate <= bookingEnd) ||
        (endDate >= bookingStart && endDate <= bookingEnd) ||
        (startDate <= bookingStart && endDate >= bookingEnd)
      );
    });
  };

  const openModal = () => {
    setOverlapSelected(false);
    if (checkOverlap(dateRange[0], dateRange[1])) {
      setOverlapSelected(true);
      return;
    }

    const check = checkOverlap(dateRange[0], dateRange[1]);
    console.log(check);
    const guestInput = document.getElementById('guests');
    setGuestsError(false);
    if (guestInput.value > maxGuests) {
      setGuestsError(true);
      return;
    }

    setBookingModalOpen(true);
  };

  const bookDates = () => {
    const guests = document.getElementById('guests').value;
    const guestNumber = parseInt(guests);

    const from = new Date(dateRange[0]);
    const to = new Date(dateRange[1]);

    const bookingData = {
      dateFrom: from,
      dateTo: to,
      guests: guestNumber,
      venueId: venue.id,
    };

    postData(bookingUrl, bookingData, token);
  };

  useEffect(() => {
    if (data && data.data) {
      setBookingStatus('Booking successful, Enjoy your stay!');
    } else if (error) {
      setBookingStatus('Booking failed, please try again');
    }
  }, [data, error]);

  return (
    <>
      <div className="flex flex-col items-center gap-4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Select your dates</h2>

        <Calendar
          onClickDay={handleDateChange}
          value={dateRange[0]}
          tileClassName={({ date }) => {
            let classNames = '';

            if (
              dateRange[0] &&
              dateRange[1] &&
              date >= dateRange[0] &&
              date <= dateRange[1]
            ) {
              classNames += ' bg-holidaze-dark text-white rounded-lg';
            }

            if (isBefore(date, today)) {
              classNames += 'opacity-0';
            }
            if (isBooked(date)) {
              classNames += ' bg-gray-100 text-gray-400 line-through';
            }
            return classNames;
          }}
          tileDisabled={({ date }) => isBefore(date, today) || isBooked(date)}
          prev2Label={null}
          next2Label={null}
        />

        <div className="flex flex-col items-center gap-4 w-full">
          <div className="p-2 bg-gray-100 rounded-md w-full">
            <strong>From:</strong>{' '}
            {dateRange[0] ? format(dateRange[0], 'dd-MM-yyyy') : ''}
          </div>
          <div className="p-2 bg-gray-100 rounded-md w-full">
            <strong>To:</strong>{' '}
            {dateRange[1] ? format(dateRange[1], 'dd-MM-yyyy') : ''}
          </div>
          {overlapSelected && (
            <p className="text-red-500">Dates overlap with existing booking</p>
          )}
        </div>

        <div className="flex flex-col items-center gap-2 w-full">
          <label htmlFor="guests" className="font-semibold w-full">
            Number of guests:
          </label>
          <input
            type="number"
            id="guests"
            name="guests"
            min="1"
            max={maxGuests}
            defaultValue="1"
            className="p-2 border rounded-md w-full"
          />
          {guestsError && (
            <p className="text-red-500 w-full">Too many guests</p>
          )}
        </div>

        <button
          onClick={openModal}
          className={`bg-holidaze-dark text-white p-2 rounded-md w-full ${dateRange[0] && dateRange[1] ? '' : 'opacity-50 cursor-not-allowed'}`}
          disabled={!dateRange[0] || !dateRange[1]}
        >
          {dateRange[0] && dateRange[1] ? 'Book dates' : 'Select dates'}
        </button>
      </div>

      {bookingModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div
            ref={modalRef}
            className="bg-white p-4 rounded-lg shadow-md w-11/12"
          >
            <h2 className="text-lg font-semibold">Booking confirmation</h2>
            <p>Are you sure you want to book these dates?</p>
            <div className="flex flex-col mt-5">
              <strong>From:</strong>{' '}
              {dateRange[0] ? format(dateRange[0], 'dd-MM-yyyy') : ''}
              <strong>To:</strong>{' '}
              {dateRange[1] ? format(dateRange[1], 'dd-MM-yyyy') : ''}
            </div>
            <div className="flex flex-col mt-2">
              <strong>Number of guests:</strong>{' '}
              {document.getElementById('guests').value}
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setBookingModalOpen(false)}
                className="bg-gray-100 text-gray-600 p-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  bookDates();
                  setBookingModalOpen(false);
                }}
                className="bg-holidaze-highlight text-black font-semibold p-2 rounded-md"
              >
                Confirm booking
              </button>
            </div>
          </div>
        </div>
      )}

      {bookingStatus !== null && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center`}
        >
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">{bookingStatus}</h2>
            <button
              onClick={() => location.reload()}
              className="bg-holidaze-highlight text-black font-semibold p-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
