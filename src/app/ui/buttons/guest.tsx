"use client";
import { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { FaSpinner } from "react-icons/fa";

export default function GuestBtn() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setIsDisabled(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsDisabled(false);
    }, 50000);
  };

  return (
    <div
      className={`bg-blue-800 rounded-md px-4 py-2 text-white hover:bg-blue-900 focus:bg-blue-950 ${
        isDisabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-1">
        <h2 className="text-xl font-semibold">
          {isLoading ? <Loader /> : <VscAccount />}
        </h2>
        Guest
      </div>
    </div>
  );
}

export const Loader = () => {
  return (
    <div className="loader">
      <FaSpinner className="text-xl animate-spin" />
    </div>
  );
};
