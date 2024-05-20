import { db } from "@/db";
import { tasks } from "@/db/schema/schema";
import { sql } from "drizzle-orm";

export async function PUT(req: Request, route: { params: { id: string } }) {
  try {
    const { id, content, createdAt, status, completed } = await req.json();
    const taskId = route.params.id;
    const taskToUpdate = await db
      .select()
      .from(tasks)
      .where(sql`${tasks.id} = id`);

    if (taskToUpdate) {
      await db
        .update(tasks)
        .set({
          //   id: id,
          content: content,
          createdAt: createdAt,
          status: status,
          completed: completed,
        })
        .where(sql`${tasks.id} = id`);
      // .returning({ id, content, createdAt, status, completed });
    }

    return Response.json({ message: "Updated successfully" });
  } catch (error) {
    console.log(`An error in updating the task: ${error}`);
    return Response.json({ message: "Failed to updated" });
  }
}
