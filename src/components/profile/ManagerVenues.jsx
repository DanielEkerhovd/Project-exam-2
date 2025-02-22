import { useState } from 'react';
import { AddVenue } from '../venue/AddVenue';
import { VenueManager } from '../venue/VenueManager';

export function ManageVenues({ user }) {
  const [createVenue, setCreateVenue] = useState(false);
  const venues = user.venues;
  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-semibold text-xl">Manage venues</h2>
      <button
        onClick={() => setCreateVenue(!createVenue)}
        className="bg-holidaze-dark text-white font-bold py-2 px-4 rounded w-fit"
      >
        {createVenue ? 'Close' : 'Add venue'}
      </button>
      {createVenue && <AddVenue setCreateVenue={setCreateVenue} />}
      {venues.length !== 0 && (
        <div className="flex flex-col gap-5">
          {venues.map((venue) => (
            <div key={venue.id}>
              <VenueManager venueInfo={venue} />
            </div>
          ))}
        </div>
      )}
      {venues.length === 0 && !createVenue && (
        <p>You currently have no venues. Add a venue to get started.</p>
      )}
    </div>
  );
}
