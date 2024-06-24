import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";

interface ConsultationProps {
  name: string;
  email: string;
  message?: string;
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user || typeof session.user.id !== "string") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, email, message } = (await req.json()) as ConsultationProps;

    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Create consultation entry
    const consultation = await prisma.consultation.create({
      data: {
        name,
        email,
        message: message ?? "",
        userId: session.user.id,
      },
    });

    return NextResponse.json({ data: consultation }, { status: 201 });
  } catch (error: any) {
    console.error(
      "Error in POST /api/consultation:",
      error.message,
      error.stack
    );
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
