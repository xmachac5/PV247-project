'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export const LoginStatus = () => {
  const { data, status } = useSession();
  if (status === 'loading') return <div>loading...</div>;
  if (status === 'unauthenticated') {
    return (
        <button 
          onClick={() => signIn('Credentials', {callbackUrl: "/"})}
          className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
        >
          Lawyer portal
        </button>
    );
  }
  return (
    <div className="flex gap-3 items-center">
      Hi, {data?.user.name}
      <button
        onClick={() => signOut({callbackUrl: "/"})}
        className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
      >
        Sign out
      </button>
    </div>
  );
};