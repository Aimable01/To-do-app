"use client";
import { IoIosLogIn } from "react-icons/io";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { Loader } from "./guest";

export default function LoginBtn() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleClick = () => {
    setIsDisabled(true);
    setIsLoading(true);

    setTimeout(() => {
      setIsDisabled(false);
      setIsLoading(false);
    }, 5000);
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-blue-800 rounded-md px-4 py-2 text-white hover:bg-blue-900 focus:bg-blue-950 ${
        isDisabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <div className="flex items-center gap-1">
        Login{" "}
        <h2 className="text-xl font-semibold">
          {" "}
          {isLoading ? <Loader /> : <IoIosLogIn />}
        </h2>
      </div>
    </div>
  );
}
