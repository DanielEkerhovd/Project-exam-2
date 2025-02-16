import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    // <form className="flex flex-col gap-4 max-w-[600px] mx-auto">
    //   <label htmlFor="email">Email</label>
    //   <input type="email" id="email" name="email" />
    //   <label htmlFor="password">Password</label>
    //   <input type="password" id="password" name="password" />
    //   <button type="submit">Login</button>
    // </form>
    <>
      <form
        className="flex flex-col gap-4 max-w-[600px] mx-auto"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <NavLink to="/register" className="text-center mb-20">
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm">Not an user yet?</p>
          <p className="bg-holidaze-dark text-white w-fit p-2 rounded-sm">
            Register here
          </p>
        </div>
      </NavLink>
    </>
  );
}
