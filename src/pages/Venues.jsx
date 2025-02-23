import { constants } from '../api/constants';
import { useGetAPI } from '../api/apiCalls';
import { VenueCard } from '../components/venue/VenueCard';

export function Venues() {
  const baseUrl =
    constants.base + constants.holidaze.base + constants.holidaze.venues.clear;
  const { data, setEndpoint } = useGetAPI(
    baseUrl + constants.holidaze.venues.rating,
  );

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.trim();
    if (searchValue.length === 0) {
      setEndpoint(baseUrl + constants.holidaze.venues.rating);
    } else {
      setEndpoint(`${baseUrl}/search?q=${searchValue}`);
    }
  };

  return (
    <>
      <section className="w-11/12 max-w-screen-2xl mx-auto flex flex-col gap-5 mb-20 min-h-[calc(100vh-80px)]">
        <h1 className="text-2xl md:text-4xl font-bold mt-5 uppercase">
          venues
        </h1>
        <div className="w-full md:w-auto flex gap-1 mb-[15px] md:mb-0">
          <input
            type="text"
            placeholder="Search..."
            className="w-full md:w-[500px] p-2 border rounded-l-lg"
            onChange={handleSearchChange}
          />
          <button className="bg-holidaze-dark rounded-r-lg flex items-center justify-center px-3">
            <img
              className="size-6 object-contain"
              src="/assets/search.png"
              alt="Search"
            />
          </button>
        </div>
        {data && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {data.data.map((venue) => (
              <VenueCard key={venue.id} {...venue} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
