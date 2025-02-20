export function ManageVenues({ user }) {
  const venues = user._count.venues;
  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-semibold text-xl">Manage venues</h2>
      {venues !== 0 ? (
        <p>You have {venues} venues</p>
      ) : (
        <div className="flex flex-col gap-2">
          <p>You have no venues</p>
          <button className="bg-holidaze-dark text-white font-bold py-2 px-4 rounded w-fit">
            Add venue
          </button>
        </div>
      )}
    </div>
  );
}
