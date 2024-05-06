"use client";
import { FormEvent, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const [viewPassword, setViewPassword] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const response: any = await signIn("credentials", {
        email,
        password,
        redirect: true,
      });
      console.log({ response });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Login Successful", response);
    } catch (error: any) {
      console.error("Login Failed:", error);
    }
  };

  return (
    <div className="bg-blue-950 w-[400px] p-5 rounded-md mx-10 flex justify-center">
      <div>
        <div className="m-5 text-center text-white">
          <h2>Please Login to continue</h2>
        </div>
        <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4">
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
                className="absolute right-[30px] top-[5px] ml-1 bg-white pl-2"
                onClick={(e) => {
                  e.preventDefault();
                  setViewPassword(!viewPassword);
                }}
              >
                {viewPassword ? <IoIosEyeOff /> : <IoMdEye />}
              </button>
            </div>
          </div>
          <Link href={""} className="text-left text-white -translate-y-3">
            <h2 className="text-[13px]">Forgot password?</h2>
          </Link>
          <div>
            <button className="bg-blue-600 font-medium text-white px-4 py-2 rounded-md text-[16px] w-[205px]">
              Login
            </button>
          </div>
        </form>

        <div className="mt-5">
          <button className=" active:bg-slate-300 bg-white px-4 py-2 rounded-md w-[220px] flex items-center gap-5 justify-center">
            <FcGoogle className="text-[20px]" />
            Sign in with Google
          </button>

          <div className="text-[14px] text-white flex items-center gap-2 my-5">
            <h2>Don't have an account</h2>{" "}
            <Link className="text-[15px] text-black font-semibold" href={""}>
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
