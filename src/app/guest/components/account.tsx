"use client";
import { VscAccount } from "react-icons/vsc";
import Link from "next/link";
import { TbLogout2 } from "react-icons/tb";
import { useState } from "react";

export default function Account() {
  const [visibility, setVisibility] = useState<boolean>(false);
  return (
    <div className="relative">
      <div
        className="text-white text-2xl font-bold cursor-pointer flex gap-2 items-center"
        onClick={() => setVisibility(!visibility)}
      >
        <div>
          <VscAccount />
        </div>
        <h2 className=" hidden font-normal text-base  md:block">Guest</h2>
      </div>

      <div
        className={`${
          visibility ? "" : "hidden"
        } absolute right-2  bg-white p-3 rounded-md`}
      >
        <div className="flex items-center gap-1 my-2 hover:bg-gray-300 p-1 rounded-md cursor-pointer md:hidden ">
          <VscAccount />
          <h2 className="text-sm" onClick={() => setVisibility(!visibility)}>
            Guest
          </h2>
        </div>

        <Link
          className="flex items-center gap-1 hover:bg-gray-300  p-1 rounded-md"
          href={"/"}
        >
          <h2 className="text-xl">
            <TbLogout2 />
          </h2>{" "}
          <h2 className="text-sm">Logout</h2>
        </Link>
      </div>
    </div>
  );
}
