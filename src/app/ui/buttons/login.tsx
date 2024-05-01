import { IoIosLogIn } from "react-icons/io";

export default function LoginBtn() {
  return (
    <div className="bg-blue-800 rounded-md px-4 py-2 text-white hover:bg-blue-900 focus:bg-blue-950">
      <h1 className="flex items-center gap-1">
        Login{" "}
        <h2 className="text-xl font-semibold">
          {" "}
          <IoIosLogIn />
        </h2>
      </h1>
    </div>
  );
}
