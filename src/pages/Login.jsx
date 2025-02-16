import { LoginForm } from '../components/login/LoginForm';

export function Login() {
  return (
    <section className="w-11/12 max-w-screen-2xl mx-auto flex flex-col items-center min-h-[calc(100vh-80px)] justify-between">
      <LoginForm />
    </section>
  );
}
