import { useState } from 'react';
import { usePostAPI } from '../../api/apiCalls';
import { constants } from '../../api/constants';

export function RegisterForm() {
  const [activeError, setActiveError] = useState([]);
  const { data, error, loading, postData } = usePostAPI();

  const register = constants.base + constants.auth.register;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    venueManager: false,
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

    if (!formData.name) {
      setActiveError(['Name is required']);
      return;
    }

    if (/\s/.test(formData.name)) {
      setActiveError(['Name cannot contain spaces']);
      return;
    }

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

    if (formData.password.length < 8) {
      setActiveError(['Password must be at least 8 characters']);
      return;
    }

    postData(register, formData);
  };

  return (
    <>
      <form
        className="flex flex-col gap-4 w-full max-w-[400px] mx-auto"
        onSubmit={handleSubmit}
      >
        <label className="font-medium text-lg" htmlFor="name">
          Name
        </label>
        <input
          className="p-2 border-black shadow-md"
          placeholder="Name"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label className="font-medium text-lg" htmlFor="email">
          Email
        </label>
        <input
          className="p-2 border-black shadow-md"
          placeholder="example@stud.noroff.com"
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
        <label className="font-medium text-lg" htmlFor="venueManager">
          Are you a venue manager?
        </label>
        <input
          className="size-5 border-black"
          type="checkbox"
          id="venueManager"
          name="venueManager"
          checked={formData.venueManager}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              venueManager: e.target.checked,
            }))
          }
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
        <p>{JSON.stringify(data)}</p>
      </form>
    </>
  );
}
