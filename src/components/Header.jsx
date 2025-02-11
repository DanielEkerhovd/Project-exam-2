import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <div className="w-11/12 mx-auto flex flex-col md:flex-row items-center md:gap-4">
      {/* Logo and Hamburger */}
      <div className="w-full flex items-center justify-between md:w-auto min-h-[80px]">
        <NavLink to="/" className="flex items-center h-full">
          <img
            className="size-[50px]"
            src="/assets/logo.png"
            alt="Holidaze logo"
          />
          <h1 className="text-2xl font-bold ml-2">Holidaze</h1>
        </NavLink>
        <div className="flex md:hidden">
          <img src="/assets/hamburger.png" alt="Hamburger menu" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full md:w-auto flex gap-1">
        <input
          type="text"
          placeholder="Search..."
          className="w-full md:w-[250px] p-2 border rounded-l-lg"
        />
        <button className="bg-holidaze-dark rounded-r-lg flex items-center justify-center px-3">
          <img
            className="size-6 object-contain"
            src="/assets/search.png"
            alt="Search"
          />
        </button>
      </div>

      {/* Navigation (hidden on small screens) */}
      <nav className="hidden md:flex items-center gap-5 ml-auto">
        <NavLink to="/hotels">Venues</NavLink>
        <NavLink to="/profile">
          <div className="bg-holidaze-dark size-12 rounded-full text-white flex items-center justify-center">
            P
          </div>
        </NavLink>
      </nav>
    </div>
  );
}
