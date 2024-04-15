import { NextResponse } from "next/server";
import { db } from "@/libs/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // search for user if exists
    const userFind = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userFind) {
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 404,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    const { password: _, ...user } = newUser;
    return NextResponse.json(user);
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
