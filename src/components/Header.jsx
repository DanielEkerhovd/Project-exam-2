import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <div className="w-11/12 max-w-screen-2xl mx-auto h-[80px] flex items-center justify-between">
      <NavLink to="/" className="flex items-center h-full">
        <img
          className="size-[50px]"
          src="/assets/logo.png"
          alt="Holidaze logo"
        />
        <h1 className="text-2xl font-bold ml-2">Holidaze</h1>
      </NavLink>
      <div>
        <img src="/assets/hamburger.png" alt="Hamburger menu" />
      </div>
    </div>
  );
}
