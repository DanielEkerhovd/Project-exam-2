import { NavLink } from 'react-router-dom';
import { RegisterForm } from '../components/auth/RegisterForm';

export function Register() {
  return (
    <section className="w-11/12 mb-20 max-w-screen-2xl mx-auto flex flex-col items-center min-h-[calc(100vh-80px)] justify-around">
      <div className="flex flex-col-reverse items-center gap-4">
        <h1 className="text-3xl font-semibold">Welcome to Holidaze!</h1>
        <img className="size-20" src="/assets/logo.png" alt="Holidaze logo" />
      </div>
      <RegisterForm />
      <NavLink to="/login" className="text-center">
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm">Already an user?</p>
          <p className="bg-holidaze-dark text-white w-fit p-2 rounded-sm">
            Login
          </p>
        </div>
      </NavLink>
    </section>
  );
}
