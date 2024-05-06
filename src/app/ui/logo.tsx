import { FaList } from "react-icons/fa";
import { inter } from "./fonts";

export default function Logo() {
  return (
    <div
      className={`${inter.className} text-white bg-blue-800 p-2 flex items-center gap-2 text-xl font-bold w-[150px] rounded-lg `}
    >
      <FaList />
      <h1>Todo app</h1>
    </div>
  );
}
