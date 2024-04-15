import { NextResponse } from "next/server";
import { db } from "@/libs/prisma";

export async function GET() {
  try {
    const tasks = await db.task.findMany();
    console.log(tasks);

    return NextResponse.json({
      tasks: {
        1: { id: 1, title: "Configure Next.js application" },
        2: { id: 2, title: "Configure Next.js and tailwind" },
        3: { id: 3, title: "Create side bar navigation menú" },
        4: { id: 4, title: "Create page footer" },
        5: { id: 5, title: "Create page navigation menú" },
        6: { id: 6, title: "Create page layout" },
        7: { id: 7, title: "new Home layout new" },
      },
    });
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

export async function POST(request: Request) {
  try {
    const { title, description } = await request.json();
    console.log(title, description);

    const newTask = await db.task.create({
      data: {
        title,
        description,
        // userId: 1,
      },
    });

    return NextResponse.json(newTask);
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
