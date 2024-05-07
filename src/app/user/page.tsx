"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function UserPage() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  console.log(session);

  if (status == "loading") {
    return null;
  }

  return (
    <div>
      <h1 className="text-slate-50">
        This is the logged in user{" "}
        {status === "authenticated" ? session.user?.name : ""}{" "}
      </h1>
      <button className="text-slate-50" onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  );
}
