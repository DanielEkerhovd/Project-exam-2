import { NavLink } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-holidaze-dark text-white text-center py-5 w-full flex justify-between px-5">
      <div className="flex justify-between px-5 w-11/12 max-w-screen-2xl mx-auto">
        <NavLink to="/" className="flex items-center gap-2">
          &copy;
          {new Date().getFullYear()} Holidaze
        </NavLink>
        <div className="flex gap-5">
          <NavLink to="/" className="text-white hover:underline">
            Home
          </NavLink>
          <NavLink to="/venues" className="text-white hover:underline">
            Venues
          </NavLink>
        </div>
      </div>
    </footer>
  );
}
