import { NextResponse } from "next/server";
import { db } from "@/libs/prisma";

export const dynamic = "force-dynamic";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  const columns = await db.column.findMany({
    where: {
      userId: Number(params.id),
    },
    include: {
      tasks: {
        select: {
          id: true,
        },
      },
    },
  });

  return NextResponse.json(columns);
}

export async function POST(request: Request, { params }: Params) {
  try {
    const { title } = await request.json();

    const newCol = await db.column.create({
      data: {
        title,
        userId: Number(params.id),
      },
    });

    return NextResponse.json(newCol);
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
    const { title } = await request.json();

    const updateColumn = await db.column.update({
      where: {
        id: Number(params.id),
      },
      data: {
        title,
      },
    });

    if (!updateColumn) {
      return NextResponse.json(
        { message: "Column not updated" },
        { status: 404 }
      );
    }

    return NextResponse.json(updateColumn);
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
    const deleteColumn = await db.column.delete({
      where: {
        id: Number(params.id),
      },
    });

    if (!deleteColumn) {
      return NextResponse.json(
        { message: "Column not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(deleteColumn);
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
