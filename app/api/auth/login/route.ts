import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  try {
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    if (user && bcrypt.compareSync(password, user.password as string)) {
      return NextResponse.json(user, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
