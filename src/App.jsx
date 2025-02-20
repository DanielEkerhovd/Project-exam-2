import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLoginStatus } from './hooks/loginStatus';

import { Home } from './pages/Home';
import { Venues } from './pages/Venues';
import { Venue } from './pages/Venue';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

import { Header } from './components/Header';
import { getStorage } from './storage/localStorage';

function App() {
  const { isLoggedIn, setLoginStatus } = useLoginStatus();

  useEffect(() => {
    const handleStorageChange = () => {
      const loginStatus = getStorage('user') !== null ? true : false;
      setLoginStatus(loginStatus);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [setLoginStatus]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/venue/:id" element={<Venue />} />

        {/* Protected Route */}
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
        />

        {/* Redirect logged-in users away from login/register */}
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!isLoggedIn ? <Register /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
