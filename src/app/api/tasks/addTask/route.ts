import { db } from "@/db";
import { tasks } from "@/db/schema/schema";
import { sql } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { content } = await req.json();
    console.log(content);
    const response = await db
      .insert(tasks)
      .values({ content: content })
      .returning();
    return Response.json({
      message: "Added task successfully",
      res: response[0],
    });
  } catch (error) {
    console.error(`An error in adding task: ${error}`);
    return Response.json({ message: "Failed to add task" });
  }
}

export async function GET() {
  try {
    const response = await db.select().from(tasks);
    return Response.json({ message: "Fetched tasks", tasks: response });
  } catch (error) {
    console.error(`An error in fetching tasks: ${error}`);
    return Response.json({ message: "Failed to fetch tasks" });
  }
}
