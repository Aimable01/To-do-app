"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Loader } from "../ui/buttons/guest";

// the types of inputs
type Inputs = {
  name: string;
  email: string;
  password: string;
};

export default function Form() {
  const router = useRouter();

  const [viewPassword, setViewPassword] = useState<boolean>(false);

  const schema = z.object({
    name: z.string().nonempty({ message: "Please enter your name" }),
    email: z
      .string()
      .nonempty({ message: "Please enter your email" })
      .email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(5, { message: "Please enter atleast 5 characters" })
      .nonempty({ message: "Please enter your password" }),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Inputs) => {
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        router.push("/login");
      }
    });

    console.log({ response });
  };

  return (
    <div className="bg-blue-950 w-[400px] p-5 rounded-md mx-10 flex justify-center">
      <div>
        <div className="m-5 text-center text-white">
          <h2>Please register to continue</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="text-white text-[14px]" htmlFor="name">
              Name
            </label>
            <div>
              <input
                className="px-2 py-1 rounded text-sm focus:outline-none"
                type="text"
                {...register("name")}
                placeholder="Enter full name"
              />
              {errors.name && (
                <p className="text-pink-500 text-sm">{errors.name.message}</p>
              )}
            </div>
          </div>
          <div>
            <label className="text-white text-[14px]" htmlFor="email">
              Email
            </label>
            <div>
              <input
                className="px-2 py-1 rounded text-sm focus:outline-none"
                {...register("email")}
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="text-pink-500 text-sm">{errors.email.message}</p>
              )}
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
                {...register("password")}
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
              {errors.password && (
                <p className="text-pink-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <button
              disabled={isSubmitting}
              className={` ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              } flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-md text-[14px]`}
            >
              {isSubmitting ? <Loader /> : ""} <p>Register</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
