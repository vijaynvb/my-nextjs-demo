// components/NavbarSession.tsx
'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function NavbarSession() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <>
          <span>Welcome, {session.user?.name}</span>
          <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <button onClick={() => signIn()}>Login</button>
      )}
    </div>
  );
}
