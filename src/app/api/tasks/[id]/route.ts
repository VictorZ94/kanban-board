import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const task = await prisma.task.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task);
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

export async function DELETE(request: Request, { params }: Params) {
  try {
    const deleteTask = await prisma.task.delete({
      where: {
        id: Number(params.id),
      },
    });

    if (!deleteTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(deleteTask);
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
export async function PUT(request: Request, { params }: Params) {
  try {
    const { title, description } = await request.json();

    const updateTask = await prisma.task.update({
      where: {
        id: Number(params.id),
      },
      data: {
        title,
        description,
      },
    });

    if (!updateTask) {
      return NextResponse.json(
        { message: "Task not updated" },
        { status: 404 }
      );
    }

    return NextResponse.json(updateTask);
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
