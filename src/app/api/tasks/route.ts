import { NextResponse } from "next/server";
import { db } from "@/libs/prisma";

export async function GET() {
  try {
    const tasks = await db.task.findMany();

    return NextResponse.json(tasks);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}
