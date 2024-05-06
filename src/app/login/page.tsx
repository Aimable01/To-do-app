import { redirect } from "next/navigation";
import Form from "./form";
import { getServerSession } from "next-auth";

export default async function Login() {
  const session = await getServerSession();

  console.log({ session });

  if (session) {
    redirect("/user");
  }

  return (
    <>
      <Form />
    </>
  );
}
