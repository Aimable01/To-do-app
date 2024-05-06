import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { db } from "@/db/migrate";
import { users } from "@/db/schema/schema";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    console.log({ name, email, password });

    const hashedPassword = await hash(password, 10);

    // save the data
    const response = await db
      .insert(users)
      .values({ name: name, email: email, password: hashedPassword });

    return NextResponse.json({ message: response.rows[0] });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ message: "failed to insert", error: error });
  }
}
