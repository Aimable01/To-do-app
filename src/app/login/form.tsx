"use client";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CgSpinnerAlt } from "react-icons/cg";
import { Loader } from "../ui/buttons/guest";

type Input = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();

  const [viewPassword, setViewPassword] = useState<boolean>(false);

  const schema = z.object({
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
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Input>({ resolver: zodResolver(schema) });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  // the credentials login provider
  const onSubmit = async (data: Input) => {
    const email = data.email;
    const password = data.password;

    try {
      const response: any = await signIn("credentials", {
        email,
        password,
        redirect: true,
      });
      console.log({ response });

      if (response === null) {
        handleNotFound();
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Login Successful", response);
    } catch (error: any) {
      console.error("Login Failed:", error);
    }
  };

  //if not found
  const handleNotFound = () => {
    alert("Invalid credentials");
  };

  //  the google provider
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setIsDisabled(true);

    console.log("Hello google login clicked");
    try {
      const res = await signIn("google", { callbackUrl: "/user" });
      console.log({ res });
      console.log("Signing in with google");
    } catch (error) {
      console.error(`An error in google login: ${error}`);
    }

    setTimeout(async () => {
      setIsLoading(false);
      setIsDisabled(false);
    }, 50000);
  };

  return (
    <div className="bg-blue-950 w-[400px] p-5 rounded-md mx-10 flex justify-center">
      <div>
        <div className="m-5 text-center text-white">
          <h2>Please Login to continue</h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="flex flex-col gap-4"
        >
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
                className="absolute right-[30px] top-[5px] ml-1 bg-white pl-2"
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
          <Link href={""} className="text-left text-white -translate-y-3">
            <h2 className="text-[13px]">Forgot password?</h2>
          </Link>
          <div>
            <button
              disabled={isSubmitting}
              className={` ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              } flex items-center gap-2 bg-blue-600 font-medium text-white px-4 py-2 rounded-md text-[16px] w-[205px]`}
            >
              {isSubmitting ? <Loader /> : ""} <p>Login</p>
            </button>
          </div>
        </form>

        <div className="mt-5">
          <button
            onClick={() => handleGoogleLogin()}
            className={` active:bg-slate-300 bg-white px-4 py-2 rounded-md w-[220px] flex items-center gap-5 justify-center ${
              isDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? <Loader /> : <FcGoogle className="text-[20px]" />}
            Sign in with Google
          </button>

          <div className="text-[14px] text-white flex items-center gap-2 my-5">
            <h2>Don't have an account</h2>{" "}
            <Link
              className="text-[15px] text-black font-semibold"
              href={"/register"}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
