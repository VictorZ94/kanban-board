import { NextResponse } from "next/server";

export async function GET() {
  const columns = await prisma?.task.findMany();
  console.log(columns);

  return NextResponse.json({
    columns: {
      "column-1": {
        id: "column-1",
        title: "To do",
        taskIds: [1, 2, 3, 4, 5, 6],
      },
      "column-2": {
        id: "column-2",
        title: "Progress",
        taskIds: [],
      },
      "column-3": {
        id: "column-3",
        title: "Completed",
        taskIds: [],
      },
    },
  });
}
