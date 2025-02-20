import { ManageVenues } from './ManagerVenues';
import { UserBookings } from './UserBookings';

export function ProfileContent({ user }) {
  const { name, venueManager, avatar } = user;
  const { url } = avatar;
  const customManager = false;
  return (
    <>
      <section className="flex items-center gap-2">
        <img
          className="rounded-full size-[68px]"
          src={url}
          alt="Profile image"
        />
        <div>
          <h1 className="text-2xl font-semibold">{name}</h1>
          {venueManager && <p className="font-light text-sm">Venue Manager</p>}
        </div>
      </section>

      {customManager ? (
        <ManageVenues user={user} />
      ) : (
        <UserBookings user={user} />
      )}
    </>
  );
}
