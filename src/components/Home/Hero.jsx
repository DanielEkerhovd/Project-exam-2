import { NavLink } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative h-[calc(100vh-80px)]  flex items-center justify-center flex-col text-white z-20 rounded-sm heroBg w-full p-3 sm:p-6">
      <div className="bg-holidaze-dark p-10 sm:p-24 z-10 flex justify-center items-center w-full h-4/6 max-w-screen-2xl">
        <div className="flex h-5/6 flex-col justify-center gap-5">
          <h1 className="text-3xl md:text-5xl font-bold">
            Welcome to Holidaze
          </h1>
          <p className="sm:text-lg md:text-2xl font-extralight">
            Vacation booking made easy
          </p>
          <NavLink
            to="/venues"
            className="bg-holidaze-highlight text-black text-sm sm:text-lg md:text-2xl font-extrabold rounded-sm p-3 uppercase w-fit"
          >
            Find a venue
          </NavLink>
        </div>
      </div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </section>
  );
}
