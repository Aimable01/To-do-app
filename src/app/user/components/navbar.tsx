import { GoHomeFill } from "react-icons/go";
import { MdOutlineAssignment } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";

export default function Navbar() {
  const links = [
    { name: "Tasks", icon: <GoHomeFill /> },
    { name: "Assigned", icon: <MdOutlineAssignment /> },
    { name: "Planned", icon: <FaCalendarCheck /> },
    { name: "Completed", icon: <IoMdDoneAll /> },
  ];

  return (
    <div className="text-white my-7 mx-5">
      <div className="flex justify-between items-center md:mx-20">
        {links.map((link, i) => (
          <div
            key={i}
            className="flex items-center gap-1 hover:text-blue-600 duration-150"
          >
            <h2 className="text-2xl md:text-lg">{link.icon}</h2>
            <h2 className="hidden md:block">{link.name} </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
