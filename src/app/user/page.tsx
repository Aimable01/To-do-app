"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Logo from "../ui/logo";
import { TbLogout2 } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import { Loader } from "../ui/buttons/guest";
import Navbar from "./components/navbar";
import Tasks from "./components/Tasks";

export default function UserPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const image = session?.user?.image as string;
  const name = session?.user?.name as string;
  const email = session?.user?.email;

  const avatar = `https://ui-avatars.com/api/?name=${name}&background=1e35b7&color=fff`;

  const handleSignOut = async () => {
    setIsDisabled(true);
    setIsLoading(true);
    await signOut();
    router.push("/");
  };

  console.log(session);

  if (status == "loading") {
    return null;
  }

  return (
    <div className="mx-10 md:mx-20">
      <div className="m-2 flex justify-between">
        <Logo />
        <div className=" relative">
          <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
            <img
              className="rounded-full w-10 h-10"
              src={image === null ? avatar : image}
              alt={`${name}'s avatar image`}
            />
          </div>
          <div
            className={`${
              isOpen ? "" : "hidden"
            } absolute right-3 w-56 text-[16px] text-black bg-slate-50 px-3 py-1 rounded-md md:right-6 md:w-72`}
          >
            <div className="">
              <h2>Name: {name}</h2>
              <h2>Email: {email}</h2>
            </div>
            <div
              className={`${
                isDisabled ? "opacity-50 cursor-not-allowed" : ""
              } flex items-center gap-1 cursor-pointer bg-blue-600 my-3 rounded-md px-2 py-1 hover:bg-blue-800`}
              onClick={handleSignOut}
            >
              <h2>{isLoading ? <Loader /> : <TbLogout2 />}</h2>{" "}
              <h2 className="text-[16px]">Sign out</h2>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Navbar />
      </div>

      <div>
        <Tasks />
      </div>
    </div>
  );
}
