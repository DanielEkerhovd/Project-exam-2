import { useState, useEffect } from 'react';
import { usePostAPI, useLogin } from '../../api/apiCalls';
import { useNavigate } from 'react-router-dom';
import { constants } from '../../api/constants';
import { setStorage } from '../../storage/localStorage';

export function RegisterForm() {
  const [activeError, setActiveError] = useState([]);
  const { data, error, loading, postData } = usePostAPI();
  const { loginData, login } = useLogin();
  const navigate = useNavigate();

  const registerUrl = constants.base + constants.auth.register;
  const loginUrl = constants.base + constants.auth.login;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    venueManager: false,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }));
  };

  const validateEmail = (email) => /^[\w-.]+@stud\.noroff\.no$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveError([]);

    if (!formData.name) return setActiveError(['Name is required']);
    if (/\s/.test(formData.name))
      return setActiveError(['Name cannot contain spaces']);
    if (!formData.email) return setActiveError(['Email is required']);
    if (!validateEmail(formData.email))
      return setActiveError(['Email must be a valid Noroff email']);
    if (!formData.password) return setActiveError(['Password is required']);
    if (formData.password.length < 8)
      return setActiveError(['Password must be at least 8 characters']);

    postData(registerUrl, formData);
  };

  useEffect(() => {
    if (data && data !== null) {
      const loginInfo = { email: formData.email, password: formData.password };

      login(loginUrl, loginInfo);
    }
  }, [data]);

  useEffect(() => {
    if (loginData?.data?.accessToken) {
      setStorage('accessToken', loginData.data.accessToken);
      setStorage('user', JSON.stringify(loginData.data));
      navigate('/');
    }
  }, [loginData, navigate]);

  return (
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
        placeholder="example@stud.noroff.no"
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
        onChange={handleChange}
      />

      {activeError.length > 0 && (
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
        {loading ? 'Registering...' : 'Register'}
      </button>
      <div>{JSON.stringify(data)}</div>
      <div>{JSON.stringify(loginData)}</div>
    </form>
  );
}
