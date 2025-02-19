import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePostAPI } from '../../api/apiCalls';
import { constants } from '../../api/constants';

import { setStorage } from '../../storage/localStorage';

export function LoginForm() {
  const [activeError, setActiveError] = useState([]);
  const { data, error, loading, postData } = usePostAPI();
  const navigate = useNavigate();

  const login = constants.base + constants.auth.login;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateEmail = (email) => {
    return /^[\w-.]+@stud\.noroff\.no$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveError([]);

    // Validate email
    if (!formData.email) {
      setActiveError(['Email is required']);
      return;
    }
    if (!validateEmail(formData.email) && formData.email) {
      setActiveError(['Email must be a valid noroff email']);
      return;
    }
    if (!formData.password) {
      setActiveError(['Password is required']);
      return;
    }

    postData(login, formData);
  };

  useEffect(() => {
    if (data && data.data && data.data.accessToken) {
      setStorage('accessToken', data.data.accessToken);
      setStorage('user', JSON.stringify(data.data));
      navigate('/');
    }
  }, [data, navigate]);

  return (
    <>
      <form
        className="flex flex-col gap-4 w-full max-w-[400px] mx-auto"
        onSubmit={handleSubmit}
      >
        <label className="font-medium text-lg" htmlFor="email">
          Email
        </label>
        <input
          className="p-2 border-black shadow-md"
          placeholder="example@holidaze.com"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label className="font-medium text-lg" htmlFor="password">
          Password
        </label>
        <input
          className="p-2 border-black shadow-md"
          placeholder="Password"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {activeError[0] && (
          <p className="text-red-500 text-sm font-semibold">{activeError[0]}</p>
        )}
        {error && (
          <p className="text-red-500 text-sm font-semibold">
            Something went wrong, try again!
          </p>
        )}
        <button
          className="bg-holidaze-highlight font-semibold text-lg p-2 rounded-sm border-black shadow-md active:scale-95 transition-transform"
          type="submit"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </>
  );
}
