"use client";
import { FormEvent, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

export default function Form() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [viewPassword, setViewPassword] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    console.log({ response });
  };

  return (
    <div className="bg-blue-950 w-[400px] p-5 rounded-md mx-10 flex justify-center">
      <div>
        <div className="m-5 text-center text-white">
          <h2>Please register to continue</h2>
        </div>
        <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4">
          <div>
            <label className="text-white text-[14px]" htmlFor="name">
              Name
            </label>
            <div>
              <input
                className="px-2 py-1 rounded text-sm focus:outline-none"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter full name"
              />
            </div>
          </div>
          <div>
            <label className="text-white text-[14px]" htmlFor="email">
              Email
            </label>
            <div>
              <input
                className="px-2 py-1 rounded text-sm focus:outline-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter email"
              />
            </div>
          </div>
          <div>
            <label className="text-white text-[14px]" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="px-2 py-1 rounded text-sm focus:outline-none"
                type={viewPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
              />
              <button
                className="absolute right-[45px] top-[5px] ml-1 bg-white pl-2"
                onClick={(e) => {
                  e.preventDefault();
                  setViewPassword(!viewPassword);
                }}
              >
                {viewPassword ? <IoIosEyeOff /> : <IoMdEye />}
              </button>
            </div>
          </div>
          <div>
            <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-[14px]">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
