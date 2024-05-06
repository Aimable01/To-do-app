"use client";

import { signOut } from "next-auth/react";

export default function UserPage() {
  const handleSignOut = () => {
    signOut({ redirect: false, callbackUrl: "http://localhost:3000" });
  };

  return (
    <div>
      {" "}
      <h1 className="text-slate-50">This is the logged in user</h1>{" "}
      <button className="text-slate-50" onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  );
}
