import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useLoginStatus } from '../../hooks/loginStatus';
import { getStorage } from '../../storage/localStorage';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const user = JSON.parse(getStorage('user')) || {};

  const { isLoggedIn, setLoggedOut } = useLoginStatus();

  useEffect(() => {
    if (isLoggedIn) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const logout = () => {
    setLoggedOut();
    location.reload();
  };

  return (
    <div className="w-11/12 max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center md:gap-4">
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
          <button onClick={() => setMenuOpen(true)}>
            <img src="/assets/hamburger.png" alt="Hamburger menu" />
          </button>
        </div>
      </div>

      {/* Navigation (hidden on small screens) */}
      <nav className="hidden md:flex items-center gap-5 ml-auto">
        <NavLink className="font-semibold" to="/venues">
          VENUES
        </NavLink>
        {loggedIn ? (
          <>
            <NavLink to="/profile">
              <div className="bg-holidaze-dark size-12 rounded-full flex items-center justify-center">
                <img
                  src={user.avatar.url}
                  className="size-10 rounded-full"
                  alt="User profile"
                />
              </div>
            </NavLink>
          </>
        ) : (
          <NavLink
            to="/login"
            className="bg-holidaze-dark text-white p-2 rounded-sm"
          >
            Login
          </NavLink>
        )}
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 w-10/12 sm:w-1/2 h-full bg-white shadow-lg z-50 transform transition-transform ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setMenuOpen(false)}
        >
          ✕
        </button>
        <nav className="flex flex-col items-start p-6 gap-4">
          <NavLink to="/venues" onClick={() => setMenuOpen(false)}>
            Venues
          </NavLink>
          <NavLink to="/profile" onClick={() => setMenuOpen(false)}>
            Profile
          </NavLink>
          {loggedIn ? (
            <button
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="bg-holidaze-dark text-white p-2 rounded-sm"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </div>
  );
}
