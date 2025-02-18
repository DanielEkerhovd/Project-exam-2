import { LoginForm } from '../components/auth/LoginForm';
import { NavLink } from 'react-router-dom';

export function Login() {
  return (
    <section className="w-11/12 max-w-screen-2xl mx-auto flex flex-col items-center min-h-[calc(100vh-80px)] justify-around">
      <div className="flex flex-col-reverse items-center gap-4">
        <h1 className="text-3xl font-semibold">Welcome back!</h1>
        <img className="size-20" src="/assets/logo.png" alt="Holidaze logo" />
      </div>
      <LoginForm />
      <NavLink to="/register" className="text-center">
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm">Not an user yet?</p>
          <p className="bg-holidaze-dark text-white w-fit p-2 rounded-sm">
            Register here
          </p>
        </div>
      </NavLink>
    </section>
  );
}
