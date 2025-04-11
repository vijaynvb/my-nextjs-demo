'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
      callbackUrl: '/dashboard',
    });
  };

  return (
    <form onSubmit={handleLogin}>
      <input name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}
