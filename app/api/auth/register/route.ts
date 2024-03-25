import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
