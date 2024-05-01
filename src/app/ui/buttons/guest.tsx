import { VscAccount } from "react-icons/vsc";

export default function GuestBtn() {
  return (
    <div className="bg-blue-800 rounded-md px-4 py-2 text-white hover:bg-blue-900 focus:bg-blue-950">
      <h1 className="flex items-center gap-1">
        <h2 className="text-xl font-semibold">
          {" "}
          <VscAccount />
        </h2>
        Guest
      </h1>
    </div>
  );
}
