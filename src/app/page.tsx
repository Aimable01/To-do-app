import GuestBtn from "./ui/buttons/guest";
import LoginBtn from "./ui/buttons/login";
import Logo from "./ui/logo";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center min-h-[500px] flex-col">
        <div className="m-5">
          <Logo />
        </div>
        <div className="text-center m-5">
          {" "}
          <p className="text-white">
            Welcome to our todo app.
            <br /> Please Login or continue as a Guest
          </p>
        </div>
        <div className="flex gap-2 m-5">
          <Link href={"/login"}>
            <LoginBtn />
          </Link>
          <Link href={"/guest"}>
            <GuestBtn />
          </Link>
        </div>
      </div>
    </>
  );
}
