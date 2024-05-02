import Logo from "@/app/ui/logo";
import Link from "next/link";
import Account from "./account";

export default function SideBar() {
  return (
    <div>
      <div className="flex justify-between items-center my-5">
        <div>
          <Link href={"/guest"}>
            {" "}
            <Logo />
          </Link>
        </div>
        <div>
          <Account />
        </div>
      </div>
    </div>
  );
}
