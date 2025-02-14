import { NavLink } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative flex items-center justify-center flex-col text-white z-20 rounded-sm heroBg w-full p-6 sm:p-16">
      <div className="bg-holidaze-dark p-5 sm:p-10 z-10 flex justify-center items-center w-full">
        <div className="flex flex-col justify-center gap-5">
          <div>
            <h1 className="text-xl sm:text-3xl font-bold">
              Welcome to Holidaze
            </h1>
            <p className="text-sm sm:text-lg font-extralight">
              Vacation booking made easy
            </p>
          </div>
          <NavLink
            to="/venues"
            className="bg-holidaze-highlight text-black text-sm sm:text-lg font-extrabold rounded-sm p-2 uppercase w-fit"
          >
            Find a venue
          </NavLink>
        </div>
      </div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </section>
  );
}
