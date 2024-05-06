import { TbLogout2 } from "react-icons/tb";


export default function LogoutBtn() {
  return (
    <div className="bg-blue-800 rounded-md px-4 py-2 text-white hover:bg-blue-900 focus:bg-blue-950">
      <div className="flex items-center gap-1">
        <h2 className="text-xl font-semibold">
          {" "}
          <TbLogout2 />
        </h2>
        Logout
      </div>
    </div>
  );
}
